import React from "react"
import { connect } from "react-redux"
import * as actions from "../actions"
import { Doughnut } from "react-chartjs-2"
import { CHART_COLORS as backgroundColor } from "../utils/constants"
import Loader from "./Loader"
import PollOptionList from "./PollOptionList"
import { submitOption } from "../actions/index"
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
  componentWillMount() {
    this.props.fetchDetails(this.props.match.params.id)
  }

  componentWillUnmount() {
    //clear global state from this poll's details
    this.props.resetDetails()
  }

  handleOptionRemove = optionId => {
    const { details, deletePoll, removeOption, history } = this.props
    if (details.options.length === 1) {
      deletePoll(details._id)
      history.push("/polls")
    } else removeOption(optionId)
  }

  renderContent() {
    const { details, userId, setVote, submitOption, removeOption } = this.props
    const pollId = this.props.match.params.id

    switch (details) {
      case null:
        return <Loader />
      case false:
        return <h3 className="md-display-3">404 Not Found</h3> //FIXME
      default:
        //determine if active poll has at least one vote
        const isVotedOn = !!details.options.find(opt => opt.voters.length)
        // non-owners can only add one option
        const canAddOption =
          details.owner === userId ||
          !details.options.find(opt => opt.author === userId)
        return (
          <div>
            <h4
              className="md-display-2"
              style={{
                textTransform: "uppercase",
                textAlign: "center"
              }}
            >
              {details.title}
            </h4>
            <div className="md-grid">
              <div className={"md-cell--" + (isVotedOn ? "4" : "12")}>
                <PollOptionList
                  userId={userId}
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

  render() {
    return this.renderContent()
  }
}

const mapStateToProps = ({ user, details }) => {
  return { userId: user && user._id, details }
}

export default connect(mapStateToProps, actions)(withRouter(PollView))
