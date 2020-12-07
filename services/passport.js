const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const {
  googleClientID,
  googleClientSecret,
  googleRedirectURI,
} = require("../config/keys");
const User = require("../models/User");

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  User.findById(id, (err, user) => done(err, user))
);

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: `${googleRedirectURI}/auth/google/callback`,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          console.log("User already exists");
          return done(null, existingUser);
        }

        const email = profile.emails[0].value;

        const newUser = new User({
          email,
          name: profile.displayName,
          googleId: profile.id,
          password: email,
          confirmPassword: email,
          photo: profile.photos[0].value,
        });

        const user = await User.create(newUser);
        done(null, user);
      } catch (err) {
        console.log(err);
      }
    }
  )
);
