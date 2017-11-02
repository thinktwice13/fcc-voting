const Poll = require("../models/Poll")
const requireLogin = require("../middleware/requireLogin")

module.exports = app => {
  //fetch all polls
  //TODO: dont fetch options - not needed
  app.get("/api/polls", (req, res) => {
    Poll.find({}, (err, list) => {
      if (err) res.send(err)
      else res.send(list)
    })
  })

  //submit new poll
  app.post("/api/polls", requireLogin, (req, res) => {
    const userId = req.user ? req.user.id : getUserHeaders()
    //cpitalize first letter of the poll title
    let title = req.body.title
    title = title.split("")[0].toUpperCase() + title.slice(1)
    const poll = new Poll({
      title,
      owner: req.user.id,
      infoUrl: req.body.infoUrl,
      options: req.body.options.map(label => {
        return {
          label: label.toUpperCase(),
          author: req.user.id,
          voters: []
        }
      })
    })

    poll.save(err => {
      if (err) res.status(422).send(err)
      else res.send(poll)
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
            label: req.body.label.toUpperCase(),
            author: req.user._id,
            voters: []
          }
        }
      },
      { new: true },
      (err, poll) => {
        if (err) res.send(err)
        else {
          const newOption = poll.options[poll.options.length - 1]
          res.send(newOption)
        }
      }
    )
  })

  //remove poll option
  app.put("/api/options/:optionId", requireLogin, (req, res) => {
    Poll.findOneAndUpdate(
      { "options._id": req.params.optionId },
      { $pull: { options: { _id: req.params.optionId } } },
      err => {
        if (err) res.send(err)
        else res.send({ msg: "Option removed.", id: req.params.optionId })
      }
    )
  })

  //set new vote
  app.put("/api/vote/:optionId", async (req, res) => {
    let updatedPoll = null
    const userId = req.user
      ? req.user.id
      : await require("../services/headers")(req.headers)
    try {
      //remove old vote
      await Poll.update(
        { "options._id": req.params.optionId, "options.voters": userId },
        { $pull: { "options.$.voters": userId } }
      )

      //add new vote
      updatedPoll = await Poll.findOneAndUpdate(
        { "options._id": req.params.optionId },
        { $push: { "options.$.voters": userId } },
        { new: true }
      )
    } catch (err) {
      console.log("Error updated votes: ", err)
    }
    res.send({ msg: "Voted", updatedPoll })
  })

  //delete poll
  app.delete("/api/polls/:pollId", requireLogin, (req, res) => {
    Poll.findByIdAndRemove(req.params.pollId, err => {
      if (err) res.send(err)
      else res.send({ msg: "Poll deleted.", id: req.params.pollId })
    })
  })
}
