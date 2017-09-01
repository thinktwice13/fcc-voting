const Poll = require("../models/Poll")

module.exports = app => {
  //fetch all polls
  //TODO: dont fetch options - not needed
  app.get("/api/polls", (req, res) => {
    Poll.find({}, (err, list) => {
      if (err) res.send(err)
      res.send(list)
    })
  })

  //submit new poll
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

  //get sigle poll details
  app.get("/api/polls/view/:pollId", (req, res) => {
    Poll.findById(req.params.pollId, (err, poll) => {
      if (err) res.send(err)
      res.send(poll)
    })
  })

  //set new vote
  app.put("/api/polls/vote/:optionId", async (req, res) => {
    try {
      //remove old vote
      await Poll.update(
        { "options._id": req.params.optionId, "options.voters": req.user.id },
        { $pull: { "options.$.voters": req.user.id } }
      )

      //add new vote
      await Poll.update(
        { "options._id": req.params.optionId },
        { $push: { "options.$.voters": req.user.id } }
      )
    } catch (err) {
      console.log("Error updated votes: ", err)
    }
    res.send({})
  })

  //delete poll
  app.delete("/api/polls/:pollId", (req, res) => {
    Poll.findByIdAndRemove(req.params.pollId, err => {
      if (err) res.send(err)
      //Poll deleted!
      res.send({})
    })
  })
}
