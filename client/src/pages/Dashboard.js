import React from "react"
import { connect } from "react-redux"
import { fetchPolls } from "../actions"
import PollFilters from "../components/PollFilters"
import NewPollBtn from "../components/layout/NewPollBtn"
import PollResults from "../components/PollResults"
import PollList from "../components//PollList"
import { getPollResults } from "../utils/helpers"
import { DashboardOrError } from "../components/HoCs"

const Dashboard = props => {
  return (
    <div className="container">
      <NewPollBtn />
      <div className="md-toolbar-relative">
        <PollFilters />
        <PollResults results={getPollResults(props.user._id, props.polls)} />
        <PollList />
      </div>
    </div>
  )
}

export default connect(({ user, polls }) => ({ user, polls }), { fetchPolls })(
  DashboardOrError(Dashboard)
)
