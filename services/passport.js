const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20")
const keys = require("../config/keys")
const mongoose = require("mongoose")
const User = require("../models/User")

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((userId, done) => {
  User.findById(userId).then(user => done(null, user))
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      //check if user exists
      User.findOne({ googleId: profile.id }).then(user => {
        user
          ? done(null, user)
          : new User({ googleId: profile.id })
              .save()
              .then(user => done(null.user))
      })
    }
  )
)
