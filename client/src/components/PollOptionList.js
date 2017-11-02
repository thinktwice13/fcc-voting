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
        // Disable current user's voted option button
        const isCurrentVote = opt.voters.includes(userId)
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
              children={opt.label}
              className="btn-wide"
            />
          </div>
        )
      })}
      <PollOptionNew
        onOptionSubmit={onOptionSubmit}
        canAddOption={canAddOption}
        optionLabels={options.map(opt => opt.label)}
      />
    </div>
  )
}
