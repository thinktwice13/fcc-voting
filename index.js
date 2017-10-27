const express = require("express")
const mongoose = require("mongoose")
const body = require("body-parser")
const keys = require("./config/keys")
const cookieSession = require("cookie-session")
const passport = require("passport")
require("./services/passport")

const app = express()
const PORT = process.env.PORT || 3003

mongoose.connect(keys.MONGO_URL, { useMongoClient: true })

//app config
app.use(body.json())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

const router = require("./routes")
console.log(router)
router(app)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))

  // Serve client/build/index.html in production
  const path = require("path")
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

app.listen(PORT, console.log(`Server started on port ${PORT}.`))
