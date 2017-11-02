process.env.NODE_ENV = "test"

const mongoose = require("mongoose")
const ObjectID = require("mongodb").ObjectID
const chai = require("chai")
const server = require("../index")
const Poll = require("../models/Poll")
const User = require("../models/User")

const should = chai.should()
chai.use(require("chai-http"))
chai.use(require("chai-things"))

describe("POLLS", () => {
  // Temporary poll/user ID's to be used as request params
  let user = null
  let pollId = null
  let optionId = null

  // Remove all polls on start
  before(done => {
    Poll.remove({}).then(() => done())
  })
  // Create temporary user
  before(done => {
    new User({}).save().then(res => {
      // Attach temporary user to request object for authentication
      server.request.user = res
      user = res
      done()
    })
  })

  // Remove temp user afterall tests have passed
  after(done => {
    User.findByIdAndRemove(user._id).then(() => done())
  })

  it("posts a poll on /api/polls", done => {
    const poll = {
      title: "My test title",
      options: ["label1", "REMOVE ME", "label3"]
    }
    chai
      .request(server)
      .post("/api/polls")
      .send(poll)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a("object")
        res.body.should.have.property("title").equal(poll.title)
        res.body.should.have.property("owner").equal(user._id + "")
        res.body.should.have.property("options").be.a("array")
        res.body.options.should.all.have.property("author", user._id + "")
        res.body.options.should.all.have.property("label")
        pollId = res.body._id
        optionId = res.body.options[1]._id
        done()
      })
  })

  it("gets all polls on /api/polls", done => {
    chai
      .request(server)
      .get("/api/polls")
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a("array")
        res.body.length.should.equal(1)
        done()
      })
  })

  it("adds a new poll option on /api/polls/:pollId", done => {
    const label = "i'm new here" // New option label
    chai
      .request(server)
      .put("/api/polls/" + pollId)
      .send({ label })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a("object")
        res.body.should.have.property("author", user._id + "")
        res.body.should.have.property("label", "I'M NEW HERE")
        res.body.should.have.property("voters").be.a("array")
        res.body.voters.length.should.equal(0)
        done()
      })
  })

  it("votes on a poll option on /api/vote/:optionId", done => {
    chai
      .request(server)
      .put("/api/vote/" + optionId)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a("object")
        res.body.should.have.property("msg", "Voted")
        res.body.should.have.property("updatedPoll")

        const option = res.body.updatedPoll.options.find(
          option => option._id === optionId
        )
        option.voters.should.contain(user._id + "")
        done()
      })
  })

  it("removes a poll option on /api/options/:optionId", done => {
    chai
      .request(server)
      .put("/api/options/" + optionId)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a("object")
        res.body.should.have.property("msg", "Option removed.")
        res.body.should.have.property("id", optionId + "")
        done()
      })
  })

  it("deletes a poll on /api/polls/:pollId", done => {
    chai
      .request(server)
      .delete("/api/polls/" + pollId)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a("object")
        res.body.should.have.property("msg", "Poll deleted.")
        res.body.should.have.property("id", pollId + "")
        done()
      })
  })
})
