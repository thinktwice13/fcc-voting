const express = require("express")
const mongoose = require("mongoose")
const keys = require("./config/keys")

const app = express()
require("./services/passport")
require("./routes/auth")(app)

mongoose.connect(keys.MONGO_URL, { useMongoClient: true })

//app config
const PORT = process.env.PORT || 3003

app.get("/", (req, res) => {
  res.send("Hello")
})

app.listen(PORT, console.log("Server started."))
