const express = require("express")
const mongoose = require("mongoose")
const keys = require("./config/keys")
const cookieSession = require("cookie-session")
const passport = require("passport")
const body = require("body-parser")
require("./services/passport")

const app = express()
const PORT = process.env.PORT || 3003

mongoose.connect(keys.MONGO_URL, { useMongoClient: true })

//app config
app.use(body.json())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())
//must be after cookieSession and passport initialization
require("./routes/auth")(app)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))

  //if route not recognized, serve index.html
  const path = require("path")
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

app.listen(PORT, console.log("Server started."))
