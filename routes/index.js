module.exports = app => {
  require("./auth")(app)
  require("./polls")(app)
}