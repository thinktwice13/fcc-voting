import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import * as actions from "../actions"
import { withRouter } from "react-router-dom"
import PollFilters from "./PollFilters"
import { getFilteredSortedList } from "../utils/helpers"
import Results from "./Results"
import Card from "react-md/lib/Cards/Card"
import CardTitle from "react-md/lib/Cards/CardTitle"
import CardActions from "react-md/lib/Cards/CardActions"
import Button from "react-md/lib/Buttons"

const FixedBtn = () => (
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

  // pollNewBtn() {
  //   if (this.props.userId) {
  //     return (
  //       <div className="fixed-action-btn">
  //         <Link
  //           to="/polls/new"
  //           className="btn-floating btn-large red waves-effect waves-light"
  //         >
  //           <i className="large material-icons">add</i>
  //         </Link>
  //       </div>
  //     )
  //   }
  // }

  handlePollClick = pollId => {
    this.props.history.push("/polls/view/" + pollId)
  }

  // pollList() {
  //   const { userId, polls, visibility } = this.props
  //   //filter poll list by visibility settings
  //   const visiblePolls = getFilteredSortedList(userId, polls, visibility)

  //   return visiblePolls.map(poll => {
  //     //determine if user is this polls's owner
  //     const isOwner = poll.owner === userId
  //     return (
  //       <div key={poll._id} className="card darken-1">
  //         <div
  //           className="card-content"
  //           onClick={this.handlePollClick.bind(null, poll._id)}
  //           style={{ cursor: "pointer" }}
  //         >
  //           <span
  //             className="card-title"
  //             style={{ fontWeight: "700", textTransform: "capitalize" }}
  //           >
  //             {poll.title}
  //           </span>
  //           <p>{`Created on ${new Date(
  //             poll.createdAt
  //           ).toLocaleDateString()} by ${poll.owner}`}</p>
  //         </div>
  //         {isOwner && (
  //           <div className="card-action">
  //             <a href="#">Share</a>
  //             <a href="#" onClick={this.props.deletePoll.bind(null, poll._id)}>
  //               Delete
  //             </a>
  //           </div>
  //         )}
  //       </div>
  //     )
  //   })
  // }

  renderPollList = () => {
    const { userId, polls, visibility } = this.props
    //filter poll list by visibility settings
    const visiblePolls = getFilteredSortedList(userId, polls, visibility)

    return visiblePolls.map(poll => {
      const isOwner = poll.owner === userId
      return (
        <div key={poll._id}>
          <Card style={{ margin: "20px 5px" }} className="md-block-centered">
            <CardTitle
              title={poll.title}
              subtitle="Card Subtitle"
              onClick={this.handlePollClick.bind(null, poll._id)}
              style={{ cursor: "pointer" }}
            />
            {isOwner && (
              <CardActions expander>
                <Button flat secondary label="Share" />
                <Button
                  flat
                  label="Delete"
                  secondary
                  onClick={this.props.deletePoll.bind(null, poll._id)}
                />
              </CardActions>
            )}
          </Card>
        </div>
      )
    })
  }

  render() {
    //   const { auth, userId, polls, setFilter, setSort, visibility } = this.props
    //   return (
    //     <div>
    //       <PollFilters
    //         auth
    //         currentFilter={visibility.filter}
    //         onFilterClick={setFilter}
    //         currentDirection={visibility.sort}
    //         onSortClick={setSort}
    //       />
    //       {auth && <Results />}
    //       {this.Dashboard()}
    //       {auth && this.pollNewBtn()}
    //     </div>
    //   )
    // }

    const { auth, userId, polls } = this.props
    return (
      <div>
        {auth && <FixedBtn />}
        <PollFilters />
        {this.renderPollList()}
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

export default connect(mapStateToProps, actions)(withRouter(Dashboard))
