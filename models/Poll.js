const mongoose = require("mongoose")
const { Schema } = mongoose

const OptionSchema = new Schema({
  label: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  //TODO change to Obj
  //TODO defautl empty array of strings
  voters: [String]
})

module.exports = mongoose.model(
  "polls",
  new Schema({
    title: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    options: [OptionSchema],
    createdAt: {
      type: Date,
      default: Date.now
    },
    lastVoted: Date
  })
)
