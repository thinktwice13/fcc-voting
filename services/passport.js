const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20")
const keys = require("../config/keys")

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken)
    }
  )
)
