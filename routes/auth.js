const passport = require("passport")

module.exports = app => {
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
      res.redirect("/polls")
    }
  )

  app.get("/api/user", (req, res) => {
    res.send(req.user)
  })

  app.get("/api/logout", (req, res) => {
    console.log("Logging out")
    req.logout()
    res.redirect("/")
  })
}
