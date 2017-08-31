const Poll = require("../models/Poll")

module.exports = app => {
  app.get("/api/polls", (req, res) => {
    Poll.find({}, (err, list) => {
      if (err) res.send(err)
      res.send(list)
    })
  })

  app.post("/api/polls", (req, res) => {
    const poll = new Poll({
      title: req.body.title,
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
