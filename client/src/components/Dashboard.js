import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import * as actions from "../actions"
import Button from "react-md/lib/Buttons"
import PollFilters from "./PollFilters"
import PollList from "./PollList"
import PollResults from "./PollResults"
import { getPollResults } from "../utils/helpers"

const NewPollBtn = () => (
  <Link to="/polls/new">
    <Button floating secondary fixed>
      add
    </Button>
  </Link>
)

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchPolls()
  }
  render() {
    if (!this.props.user || !this.props.polls) {
      return null
    }

    if (!this.props.polls.length) {
      return (
        <div>
          <NewPollBtn />
          <div>No Polls Found</div>
        </div>
      )
    }

    return (
      <div>
        <NewPollBtn />
        <PollFilters />
        <PollResults
          user={this.props.user}
          results={getPollResults(this.props.user._id, this.props.polls)}
        />
        <PollList />
      </div>
    )
  }
}

export default connect(({ user, polls }) => ({ user, polls }), {
  fetchPolls: actions.fetchPolls
})(Dashboard)
