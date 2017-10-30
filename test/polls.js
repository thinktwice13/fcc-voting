const chai = require("chai")
const chaiHttp = require("chai-http")
const mongoose = require("mongoose")

const Poll = require("../models/Poll")
const User = require("../models/User")
const server = require("../index")
const should = chai.should()

chai.use(chaiHttp)
chai.use(require("chai-things"))

describe("Polls", () => {
  // Testing user and poll/options ids
  let user = null
  let pollId = null
  let optionId = null

  // Mocked poll and option
  const poll = {
    title: "Test polls title",
    options: ["option1", "opt2", "opt3"]
  }
  const option = { label: "The newest new option" }

  beforeEach(done => {
    User.find({}, (err, result) => {
      user = result[0]
      done()
    }).limit(1)
  })

  describe("/GET polls", () => {
    it("gets all the polls", done => {
      chai
        .request(server)
        .get("/api/polls")
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("array")
          res.body.should.all.have.property("title")
          res.body.should.all.have.property("owner")
          res.body.should.all.have.property("options")
          res.body.should.all.have.property("options").be.a("array")
          done()
        })
    })

    it("doesn't post a poll if unauthorised", done => {
      chai
        .request(server)
        .post("/api/polls")
        .send(poll)
        .end((err, res) => {
          res.should.have.status(401)
          res.body.should.be.a("object")
          res.body.should.have.property("error").equal("Please log in first.")
          done()
        })
    })

    // Auth request tests
    it("posts a poll", done => {
      server.request.user = user
      chai
        .request(server)
        .post("/api/polls")
        .send(poll)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("object")
          res.body.should.have.property("title")
          res.body.should.have.property("owner").equal("" + user._id)
          res.body.should.have.property("options").be.a("array")
          pollId = res.body._id
          done()
        })
    })

    it("adds a new poll option", done => {
      // server.request.user = user
      chai
        .request(server)
        .put("/api/polls/" + pollId)
        .send(option)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.have.property("author").equal("" + user._id)
          res.body.should.have
            .property("label")
            .equal(option.label.toUpperCase())
          res.body.should.have.property("voters").be.a("array")
          optionId = res.body._id
          done()
        })
    })

    it("removes a poll option", done => {
      // server.request.user = user
      chai
        .request(server)
        .put("/api/options/" + optionId)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("object")
          res.body.should.have.property("msg").equal("Poll option removed.")
          done()
        })
    })

    it("votes on a poll", done => {
      chai
        .request(server)
        .put("/api/vote/" + optionId)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("object")
          res.body.should.have.property("msg").equal("Voted on " + optionId)
          done()
        })
    })

    it("deletes a poll", done => {
      // server.request.user = user
      chai
        .request(server)
        .delete("/api/polls/" + pollId)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("object")
          res.body.should.have.property("msg").equal(`Poll ${pollId} deleted.`)
          done()
        })
    })
  })
})
