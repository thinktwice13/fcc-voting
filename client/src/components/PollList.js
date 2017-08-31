import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import * as actions from "../actions"

class PollList extends React.Component {
  componentDidMount() {
    this.props.fetchPolls()
  }

  pollNewBtn() {
    if (this.props.user) {
      return (
        <div className="fixed-action-btn">
          <Link to="/polls/new" className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </Link>
        </div>
      )
    }
  }

  pollList() {
    console.log(this.props.polls)
  }

  render() {
    return (
      <div>
        {this.pollList()}
        {this.pollNewBtn()}
      </div>
    )
  }
}

const mapStateToProps = ({ user, polls }) => {
  return { user, polls }
}

export default connect(mapStateToProps, actions)(PollList)
