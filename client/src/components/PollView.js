import React from "react"
import { connect } from "react-redux"
import * as actions from "../actions"

class PollView extends React.Component {
  renderOptions = () => {
    return <div className="col m6">Options</div>
  }
  renderChart = () => {
    return <div className="col m6">Chart</div>
  }
  render() {
    return (
      <div className="row">
        {this.renderOptions()}
        {this.renderChart()}
      </div>
    )
  }
}

const mapStateToProps = ({ poll }) => {
  return { poll }
}

export default connect(mapStateToProps)(PollView)
