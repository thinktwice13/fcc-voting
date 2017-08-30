const express = require("express")
const mongoose = require("mongoose")
const keys = require("./config/keys")
const cookieSession = require("cookie-session")
const passport = require("passport")

const app = express()
require("./services/passport")

mongoose.connect(keys.MONGO_URL, { useMongoClient: true })

//app config
const PORT = process.env.PORT || 3003

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

app.get("/", (req, res) => {
  res.send("Hello")
})

app.listen(PORT, console.log("Server started."))
