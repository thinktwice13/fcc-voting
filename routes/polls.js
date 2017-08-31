const Poll = require("../models/Poll")

module.exports = app => {
  app.post("/api/polls", (req, res) => {
    const poll = new Poll({
      ...req.body,
      owner: req.user.id
    })
    console.log("Poll to save: ", poll)
  })
}
