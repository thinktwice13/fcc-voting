import React from "react"
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
    <div className="btn-list">
      {options.map(opt => {
        //disable button is this is user's current vote
        const isCurrentVote = opt.voters.includes(userId)
        //TODO users can remove options on their own polls and their custom options onother user's polls if they haven't been voted on yet
        const canRemoveOption = opt.author === userId
        return (
          <div key={opt._id} className="flex-options">
            {canRemoveOption && (
              <span className="btn-hidden">
                <Button
                  raised
                  secondary
                  className="btn-minimal"
                  onClick={onOptionRemove.bind(null, opt._id)}
                >
                  delete
                </Button>
              </span>
            )}
            <Button
              raised
              primary
              onClick={onVote.bind(null, opt._id, userId)}
              disabled={isCurrentVote}
              label={opt.label}
              className="btn-wide"
            />
          </div>
        )
      })}
      <PollOptionNew
        onOptionSubmit={val => val && onOptionSubmit}
        canAddOption={canAddOption}
      />
    </div>
  )
}
