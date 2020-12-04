const express = require('express');
const { googleClientID, googleClientSecret } = require('./config/keys');
const app = express()

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
 
passport.use(new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile)
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT} port`)
})