import React from "react"
import Button from "react-md/lib/Buttons/Button"

export default ({ results }) => (
  <div className="flex-results">
    <Button flat disabled children={"MY VOTES: " + results.myVotes} />
    <Button flat disabled children={"MY POLLS: " + results.myPolls} />
    <Button flat disabled children={"MY POLLS VOTES: " + results.myPollVotes} />
  </div>
)
