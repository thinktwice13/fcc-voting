import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import * as actions from "../actions"
import { withRouter } from "react-router-dom"
import PollFilters from "./PollFilters"
class PollList extends React.Component {
  componentDidMount() {
    this.props.fetchPolls()
  }

  pollNewBtn() {
    if (this.props.user) {
      return (
        <div className="fixed-action-btn">
          <Link
            to="/polls/new"
            className="btn-floating btn-large red waves-effect waves-light"
          >
            <i className="large material-icons">add</i>
          </Link>
        </div>
      )
    }
  }

  handlePollClick = pollId => {
    this.props.history.push("/polls/view/" + pollId)
  }

  pollList() {
    const polls = this.props.polls
    return polls.map(poll => {
      return (
        <div key={poll._id} className="card darken-1">
          <div
            className="card-content"
            onClick={this.handlePollClick.bind(null, poll._id)}
            style={{ cursor: "pointer" }}
          >
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
            <a href="#" onClick={this.props.deletePoll.bind(null, poll._id)}>
              Delete
            </a>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <PollFilters />
        {this.pollList()}
        {this.pollNewBtn()}
      </div>
    )
  }
}

const mapStateToProps = ({ user, polls }) => {
  return { user, polls }
}

export default connect(mapStateToProps, actions)(withRouter(PollList))
