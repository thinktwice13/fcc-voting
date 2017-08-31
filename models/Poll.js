const mongoose = require("mongoose")
const { Schema } = mongoose

const OptionSchema = new Schema({
  label: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  voters: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
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
