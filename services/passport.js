const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { googleClientID, googleClientSecret, googleRedirectURI } = require('../config/keys');
const User = require('../models/User');

passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

passport.use(new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: `${googleRedirectURI}/auth/google/callback`,
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ googleId: profile.id }) 
      const newUser = new User({
        name: profile.displayName,
        googleId: profile.id
      })
      
      if(!user) {
        User.create(newUser).then(user => done(null, user)).catch(err => console.log(err))
      } else {
        done(null, user)
        console.log('User already exists')
      }
    } catch(err) {
      console.log(err)
    }
  }
));