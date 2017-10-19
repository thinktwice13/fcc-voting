import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { fetchPolls } from "../actions"
import ErrorPage from "./ErrorPage"
import PollFilters from "../components/PollFilters"
import PollResults from "../components/PollResults"
import PollList from "../components//PollList"
import Button from "react-md/lib/Buttons"
import { getPollResults } from "../utils/helpers"

const NewPollBtn = () => (
  <Link to="/polls/new">
    <Button floating secondary fixed>
      add
    </Button>
  </Link>
)

const Dashboard = props => {
  if (!props.user || !props.polls) {
    return null
  }

  /* 
  Show error page if no polls fetched
  TODO replace with HoC
  */
  if (props.polls.length === 0) {
    return (
      <div>
        <ErrorPage
          title="No polls found :("
          msg="Add one yourself or try again later"
        />
        {props.user.auth && <NewPollBtn />}
      </div>
    )
  }

  return (
    <div className="container">
      <div className="md-toolbar-relative">
        {props.user.auth && <NewPollBtn />}
        <PollFilters />
        {props.user.auth && (
          <PollResults
            user={props.user}
            results={getPollResults(props.user._id, props.polls)}
          />
        )}
        <PollList />
      </div>
    </div>
  )
}

export default connect(({ user, polls }) => ({ user, polls }), { fetchPolls })(
  Dashboard
)
