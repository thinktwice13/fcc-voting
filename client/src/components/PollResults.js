import React from "react"
import Button from "react-md/lib/Buttons/Button"
import { withAuth } from "../components/HoCs"

const PollResults = ({ results }) => (
  <div className="flex-results">
    <Button flat disabled children={"MY VOTES: " + results.myVotes} />
    <Button flat disabled children={"MY POLLS: " + results.myPolls} />
    <Button flat disabled children={"MY POLLS VOTES: " + results.myPollVotes} />
  </div>
)

export default withAuth(PollResults)
