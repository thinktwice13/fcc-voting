import React from "react"
import { connect } from "react-redux"
import * as actions from "../actions"

class PollView extends React.Component {
  componentDidMount() {
    this.props.fetchDetails(this.props.match.params.id)
  }

  renderContent() {
    switch (this.props.details) {
      case null:
        return <h3>Loading...</h3>
      case false:
        return <h3>404 Not Found</h3>
      default:
    return (
          <div>
            <h2>{this.props.details.title}</h2>
        {this.renderOptions()}
        {this.renderChart()}
      </div>
    )
  }
}
  render() {
    return <div className="row">{this.renderContent()}</div>
  }
}

const mapStateToProps = ({ details }) => ({ details })

export default connect(mapStateToProps, actions)(PollView)
