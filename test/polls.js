const mongoose = require("mongoose")
const chai = require("chai")
const chaiHttp = require("chai-http")

const server = require("../index")
const Poll = require("../models/Poll")
const User = require("../models/User")

const should = chai.should()
chai.use(chaiHttp)

describe("Polls", () => {
  describe("/GET polls", () => {
    it("gets all the polls", done => {
      chai
        .request(server)
        .get("/api/polls")
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a("array")
          done()
        })
    })
  })
})
