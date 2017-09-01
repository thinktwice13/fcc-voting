import React from "react"
import { connect } from "react-redux"
import * as actions from "../actions"
import { Doughnut } from "react-chartjs-2"
import { CHART_COLORS as backgroundColor } from "../utils/constants"

const PollOptions = ({ options }) => (
  <div>
    {options.map(opt => (
      <div key={opt.label}>
        <button
          className="btn teal wave-effect wave-light"
          style={{ width: "100%", margin: "5px 0" }}
        >
          {opt.label}
        </button>
      </div>
    ))}
  </div>
)

const Chart = ({ options }) => {
  const data = {
    labels: options.map(opt => opt.label),
    datasets: [
      { data: options.map(opt => opt.voters.length || 0), backgroundColor }
    ]
  }
  console.log(data)
  return <Doughnut data={data} />
}

class PollView extends React.Component {
  componentDidMount() {
    this.props.fetchDetails(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.resetDetails()
  }

  renderContent() {
    const { details } = this.props
    switch (details) {
      case null:
        return <h3>Loading...</h3>
      case false:
        return <h3>404 Not Found</h3>
      default:
        //determine if active poll has at least one vote
        const isVotedOn = !!details.options.find(opt => opt.voters.length)
        return (
          <div>
            <h2>{details.title}</h2>
            <div className={"col s12 " + (isVotedOn ? "m4" : "m12")}>
              <PollOptions options={details.options} />
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

const mapStateToProps = ({ details }) => {
  console.log(details)
  return { details }
}

export default connect(mapStateToProps, actions)(PollView)
