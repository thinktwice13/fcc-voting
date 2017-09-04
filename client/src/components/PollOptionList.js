import React from "react"
import { connect } from "react-redux"
import * as actions from "../actions"
import PollOptionNew from "./PollOptionNew"
import Button from "react-md/lib/Buttons/Button"

export default props => {
  const {
    userId,
    options,
    onVote,
    onOptionSubmit,
    canAddOption,
    onOptionRemove
  } = props
  return (
    <div>
      {options.map(opt => {
        //disable button is this is user's current vote
        const isCurrentVote = opt.voters.includes(userId)
        //TODO users can remove options on their own polls and their custom options onother user's polls if they haven't been voted on yet
        const canRemoveOption = opt.author === userId
        return (
          <div key={opt.label} className="flex-options">
            <Button
              raised
              primary
              onClick={onVote.bind(null, opt._id, userId)}
              disabled={isCurrentVote}
              label={opt.label}
              className="btn-wide"
            />
            <Button
              flat
              primary
              className="btn-minimal"
              onClick={onOptionRemove.bind(null, opt._id)}
            >
              delete
            </Button>
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
