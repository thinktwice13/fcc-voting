const express = require("express")
const mongoose = require("mongoose")

//include keys and secrets
require("./config/keys")

//app config
const app = express()
const PORT = process.env.PORT || 3003

app.listen(PORT, console.log("Server started."))
