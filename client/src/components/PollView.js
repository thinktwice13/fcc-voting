import React from "react"
import { connect } from "react-redux"
import * as actions from "../actions"
import { Doughnut } from "react-chartjs-2"
import { CHART_COLORS as backgroundColor } from "../utils/constants"
import PollOptionList from "./PollOptionList"
import { withRouter } from "react-router-dom"

const Chart = ({ options }) => {
  const data = {
    labels: options.map(opt => opt.label),
    datasets: [
      { data: options.map(opt => opt.voters.length || 0), backgroundColor }
    ]
  }
  return <Doughnut data={data} />
}

class PollView extends React.Component {
  componentDidMount() {
    this.props.fetchDetails(this.props.match.params.id)
  }

  componentWillUnmount() {
    //clear global state from this poll's details
    this.props.resetDetails()
  }

  handleOptionRemove = optionId => {
    //delete entire poll when removing last option
    const props = this.props
    if (props.details.options.length === 1) {
      props.deletePoll(props.details._id)
      props.history.push("/polls")
    } else props.removeOption(optionId)
  }

  render() {
    const { details, user, setVote, submitOption, match } = this.props

    if (!user || !details) {
      return null
    }

    const pollId = match.params.id
    //determine if active poll has at least one vote
    const isVotedOn = !!details.options.find(opt =>
      opt.voters.includes(user._id)
    )
    // non-owners can only add one option
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
              onOptionRemove={this.handleOptionRemove}
              options={details.options}
              onOptionSubmit={text => submitOption(pollId, text)}
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
}

const mapStateToProps = state => ({ user: state.user, details: state.details })

export default connect(mapStateToProps, actions)(withRouter(PollView))
