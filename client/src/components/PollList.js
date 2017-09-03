import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import * as actions from "../actions"
import { withRouter } from "react-router-dom"
import PollFilters from "./PollFilters"
import { getFilteredList } from "../utils/helpers"
class PollList extends React.Component {
  componentDidMount() {
    this.props.fetchPolls()
  }

  pollNewBtn() {
    if (this.props.userId) {
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
    const { userId, polls, visibility } = this.props
    //filter poll list by visibility settings
    const visiblePolls = getFilteredList(userId, polls, visibility)

    return visiblePolls.map(poll => {
      //determine if user is this polls's owner
      const isOwner = poll.owner === userId
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
          {isOwner && (
            <div className="card-action">
              <a href="#">Share</a>
              <a href="#" onClick={this.props.deletePoll.bind(null, poll._id)}>
                Delete
              </a>
            </div>
          )}
        </div>
      )
    })
  }

  render() {
    const { auth, userId, polls, setFilter, visibility } = this.props
    return (
      <div>
        <PollFilters
          auth
          onFilterClick={setFilter}
          currentFilter={visibility.filter}
          currentDirection={visibility.sort}
        />
        {auth && <Results />}
        {this.pollList()}
        {auth && this.pollNewBtn()}
      </div>
    )
  }
}

const mapStateToProps = ({ user, polls, visibility }) => {
  return {
    auth: user && user.auth,
    userId: user && user._id,
    polls,
    visibility
  }
}

export default connect(mapStateToProps, actions)(withRouter(PollList))
