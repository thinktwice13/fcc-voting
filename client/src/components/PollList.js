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
    const polls = this.props.polls
    console.log(polls)

    return polls.map(poll => {
      return (
        <div key={poll._id} className="card darken-1">
          <div className="card-content">
            <span
              className="card-title"
              style={{ fontWeight: "700", textTransform: "capitalize" }}
            >
              {poll.title}
            </span>
            <p>{`Created on ${new Date(
              poll.createdAt
            ).toLocaleDateString()} by ${poll.owner}`}</p>
          </div>
          <div className="card-action">
            <a href="#">Share</a>
            <a href="#">Delete</a>
          </div>
        </div>
      )
    })
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
