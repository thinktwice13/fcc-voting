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
    const userId = req.user ? req.user.id : getUserHeaders()
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

  //submit new poll option
  app.put("/api/polls/:pollId", requireLogin, (req, res) => {
    //save new option to the specified poll
    Poll.findByIdAndUpdate(
      req.params.pollId,
      {
        $push: {
          options: {
            label: req.body.label,
            author: req.user._id,
            voters: []
          }
        }
      },
      { new: true },
      (err, poll) => {
        if (err) res.send(err)
        const newOption = poll.options[poll.options.length - 1]
        res.send(newOption)
      }
    )
  })

  //get single poll details
  app.get("/api/polls/view/:pollId", (req, res) => {
    Poll.findById(req.params.pollId, (err, poll) => {
      if (err) res.send(err)
      res.send(poll)
    })
  })

  //set new vote
  app.put("/api/polls/vote/:optionId", async (req, res) => {
    const userId = req.user
      ? req.user.id
      : await require("./utils")(req.headers)
    console.log("User voting: ", userId)
    try {
      //remove old vote
      await Poll.update(
        { "options._id": req.params.optionId, "options.voters": userId },
        { $pull: { "options.$.voters": userId } }
      )

      //add new vote
      await Poll.update(
        { "options._id": req.params.optionId },
        { $push: { "options.$.voters": userId } }
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
