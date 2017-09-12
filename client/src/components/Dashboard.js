import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import * as actions from "../actions"
import { ErrorPage } from "./helpers"
import PollFilters from "./PollFilters"
import PollResults from "./PollResults"
import PollList from "./PollList"
import Button from "react-md/lib/Buttons"
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
    console.log("Polls", this.props.polls)
    // this.props.fetchPolls()
  }
  render() {
    if (!this.props.user || !this.props.polls) {
      return null
    }

    if (this.props.polls.length === 0) {
      return (
        <div>
          <ErrorPage
            title="No polls found :("
            msg="Add one yourself or try again later"
          />
          {this.props.user.auth && <NewPollBtn />}
        </div>
      )
    }

    return (
      <div className="container">
        <div className="md-toolbar-relative">
          {this.props.user.auth && <NewPollBtn />}
          <PollFilters />
          {this.props.user.auth && (
            <PollResults
              user={this.props.user}
              results={getPollResults(this.props.user._id, this.props.polls)}
            />
          )}
          <PollList />
        </div>
      </div>
    )
  }
}

export default connect(({ user, polls }) => ({ user, polls }), {
  fetchPolls: actions.fetchPolls
})(Dashboard)
