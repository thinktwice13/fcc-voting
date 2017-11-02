import React from "react"
import { connect } from "react-redux"
import * as actions from "../actions"
import { Doughnut } from "react-chartjs-2"
import { CHART_COLORS as backgroundColor } from "../utils/constants"
import PollOptionList from "../components/PollOptionList"
import { withIdMatch } from "../components/HoCs"

const Chart = ({ options }) => {
  const data = {
    labels: options.map(opt => opt.label),
    datasets: [
      { data: options.map(opt => opt.voters.length || 0), backgroundColor }
    ]
  }
  return <Doughnut data={data} />
}

const PollView = props => {
  const {
    details,
    user,
    setVote,
    submitOption,
    deletePoll,
    removeOption,
    match,
    history
  } = props
  const pollId = match.params.id

  const handleOptionRemove = optionId => {
    // When removing last poll option, delete poll and redirect to Dashboard
    if (details.options.length === 1) {
      deletePoll(details._id)
      history.push("/polls")
    } else removeOption(optionId)
  }

  // Determine if active poll has at least one vote
  const isVotedOn = !!details.options.find(opt => opt.voters.includes(user._id))

  // Non-owners can only add one option
  const canAddOption =
    user &&
    user.auth &&
    (details.owner === user._id ||
      !details.options.find(opt => opt.author === user._id))

  return (
    <div className="container">
      <h4
        className="md-text-capitalize md-text-center md-display-1 md-toolbar-relative md-font-semibold"
        style={{
          textTransform: "uppercase",
          textAlign: "center"
        }}
      >
        {details.title}
      </h4>
      <div className="md-grid poll-view">
        <div className={"md-cell--" + (isVotedOn ? "4" : "12")}>
          <PollOptionList
            userId={user._id}
            onVote={setVote}
            onOptionRemove={handleOptionRemove}
            options={details.options}
            onOptionSubmit={text => !!text && submitOption(pollId, text)}
            canAddOption={canAddOption}
          />
        </div>
        {isVotedOn && (
          <div className="md-cell--8">
            <Chart options={details.options} />
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = ({ user, polls }, ownProps) => {
  const details =
    polls && polls.find(poll => poll._id === ownProps.match.params.id)
  return { details, user }
}

export default connect(mapStateToProps, actions)(withIdMatch(PollView))
