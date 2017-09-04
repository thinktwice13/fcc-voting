import React from "react"
import { connect } from "react-redux"
import * as actions from "../actions"
import PollOptionNew from "./PollOptionNew"

export default props => {
  const { userId, options, onVote, onOptionSubmit } = props
  return (
    <div>
      {options.map(opt => {
        //disable button is this is user's current vote
        const isCurrentVote = opt.voters.includes(userId)
        return (
          <div key={opt.label}>
            <button
              onClick={onVote.bind(null, opt._id, userId)}
              style={{ margin: "5px 0" }}
              className={"btn teal wide" + (isCurrentVote && " disabled")}
            >
              {opt.label}
            </button>
          </div>
        )
      })}
      <PollOptionNew onOptionSubmit={onOptionSubmit} />
    </div>
  )
}