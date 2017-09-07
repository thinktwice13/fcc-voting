import React from "react"
import { connect } from "react-redux"
import * as actions from "../actions"
import { getVisibleList } from "../utils/helpers"
import Card from "react-md/lib/Cards/Card"
import CardTitle from "react-md/lib/Cards/CardTitle"
import CardActions from "react-md/lib/Cards/CardActions"
import { withRouter } from "react-router-dom"
import Button from "react-md/lib/Buttons"
import Shares from "./Shares"

const PollCard = props => {
  //only show additional info and delete button to poll owners
  const isOwner = props.poll.owner === props.user._id

  return (
    <Card className="md-block-centered">
      <CardTitle
        title={props.poll.title}
        subtitle="Card Subtitle"
        onClick={props.onPollClick}
        style={{ cursor: "pointer" }}
      />
      {props.user.auth && (
        <CardActions>
          {isOwner && (
            <Button flat label="Delete" secondary onClick={props.onDelete} />
          )}
          <Shares title={props.poll.title} poll={props.poll._id} />
        </CardActions>
      )}
    </Card>
  )
}

const PollList = props => {
  //filter list by visibility settings
  const visibleList = getVisibleList(
    props.user._id,
    props.polls,
    props.visibility
  )
  return (
    <div className="card-list">
      {visibleList.map(poll => (
        <PollCard
          key={poll._id}
          user={props.user}
          poll={poll}
          onPollClick={() => props.history.push("/polls/view/" + poll._id)}
          onDelete={() => props.deletePoll(poll._id)}
        />
      ))}
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  polls: state.polls,
  visibility: state.visibility
})

export default connect(mapStateToProps, actions)(withRouter(PollList))
