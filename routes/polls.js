const Poll = require("../models/Poll")

module.exports = app => {
  app.post("/api/polls", (req, res) => {
    const poll = new Poll({
      ...req.body,
      owner: req.user.id,
      options: req.body.options.map(label => {
        return {
          label,
          author: req.user.id,
          voters: []
        }
      })
    })

    poll.save(err => {
      if (err) res.status(422).send(err)
      res.send(poll)
    })
  })
}
