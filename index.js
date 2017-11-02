const express = require("express")
const body = require("body-parser")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const passport = require("passport")

const app = express()

const PORT = process.env.PORT || 3003
console.log({ NODE_ENV: process.env.NODE_ENV })
mongoose.connect(
  process.env.NODE_ENV === "test"
    ? "mongodb://localhost/test"
    : require("./config/keys").MONGO_URL,
  { useMongoClient: true }
)

//app config
app.use(body.json())
if (process.env.NODE_ENV !== "test") {
  require("./services/passport")
  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      keys: [require("./config/keys").cookieKey]
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
}

require("./routes")(app)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))

  // Serve client/build/index.html in production
  const path = require("path")
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

app.listen(PORT, console.log(`Server started on port ${PORT}.`))

module.exports = app
