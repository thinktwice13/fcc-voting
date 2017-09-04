import React from "react"
import { connect } from "react-redux"
import * as actions from "../actions"
import PollOptionNew from "./PollOptionNew"
import Button from "react-md/lib/Buttons/Button"

export default props => {
  const { userId, options, onVote, onOptionSubmit, canAddOption } = props
  return (
    <div>
      {options.map(opt => {
        //disable button is this is user's current vote
        const isCurrentVote = opt.voters.includes(userId)
        return (
          <div key={opt.label}>
            <Button
              raised
              primary
              onClick={onVote.bind(null, opt._id, userId)}
              disabled={isCurrentVote}
              style={{ margin: "5px 0" }}
              label={opt.label}
              className="btn-wide"
            />
          </div>
        )
      })}
      <PollOptionNew
        onOptionSubmit={onOptionSubmit}
        canAddOption={canAddOption}
      />
    </div>
  )
}
