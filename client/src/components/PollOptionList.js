import React from "react"
import { connect } from "react-redux"
import * as actions from "../actions"

class PollOptionList extends React.Component {
  render() {
    console.log(this.props.userId)
    const { userId, options, setVote } = this.props
    return (
      <div>
        {options.map(opt => {
          //disable button is this is user's current vote
          const isCurrentVote = opt.voters.includes(userId)
          return (
            <div key={opt.label}>
              <button
                onClick={setVote.bind(null, opt._id, userId)}
                className={
                  "btn teal wave-effect wave-light" +
                  (isCurrentVote && " disabled")
                }
                style={{ width: "100%", margin: "5px 0" }}
              >
                {opt.label}
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}

export default connect(null, actions)(PollOptionList)
