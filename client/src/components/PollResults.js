import React from "react"
import Button from "react-md/lib/Buttons/Button"

export default ({ results }) => (
  <div className="flex-results">
    <Button flat disabled label={"MY VOTES: " + results.myVotes} />
    <Button flat disabled label={"MY POLLS: " + results.myPolls} />
    <Button flat disabled label={"MY POLLS VOTES: " + results.myPollVotes} />
  </div>
)
