const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20")
const keys = require("./config/keys")

mongoose.connect(keys.MONGO_URL, { useMongoClient: true })

//app config
const app = express()
const PORT = process.env.PORT || 3003

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleSecret,
      callbackURL: "/auth/google/callback"
    },
    accessToken => {
      console.log(accessToken)
    }
  )
)

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
)

app.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/")
  }
)

app.get("/", (req, res) => {
  res.send("Hello")
})

app.listen(PORT, console.log("Server started."))
