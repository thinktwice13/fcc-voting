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

  app.get("/api/user", async (req, res) => {
    //if there is no authenticated user, identify user with req headers
    if (!req.user) {
      //if there is no authenticated user sent with request
      const id = await require("../services/headers")(req.headers)
      res.send({ _id: id, auth: false })
    } else {
      //if logged in user found
      res.send({ _id: req.user._id, auth: true })
    }
  })

  app.get("/api/logout", (req, res) => {
    console.log("Logging out")
    req.logout()
    res.redirect("/")
  })
}
