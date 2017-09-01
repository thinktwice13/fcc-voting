import React from "react"
import { connect } from "react-redux"
import * as actions from "../actions"
import { Doughnut } from "react-chartjs-2"
import { CHART_COLORS as backgroundColor } from "../utils/constants"
import Loader from "./Loader"
import PollOptionList from "./PollOptionList"

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

  renderContent() {
    const { details, userId } = this.props
    switch (details) {
      case null:
        return <Loader />
      case false:
        return <h3>404 Not Found</h3>
      default:
        //determine if active poll has at least one vote
        const isVotedOn = !!details.options.find(opt => opt.voters.length)
        return (
          <div>
            <h2>{details.title}</h2>
            <div className={"col s12 " + (isVotedOn ? "m4" : "m12")}>
              <PollOptionList options={details.options} userId={userId} />
            </div>
            {isVotedOn && (
              <div className="col m8 s12">
                <Chart options={details.options} />
              </div>
            )}
          </div>
        )
    }
  }

  render() {
    return <div className="row">{this.renderContent()}</div>
  }
}

const mapStateToProps = ({ user, details }) => {
  const userId = user && user._id
  return { userId, details }
}

export default connect(mapStateToProps, actions)(PollView)
