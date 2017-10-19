import React from "react"
import { connect } from "react-redux"
import * as actions from "../actions"
import { getVisibleList, getTotalVotes } from "../utils/helpers"
import Card from "react-md/lib/Cards/Card"
import CardTitle from "react-md/lib/Cards/CardTitle"
import CardActions from "react-md/lib/Cards/CardActions"
import { withRouter } from "react-router-dom"
import Button from "react-md/lib/Buttons"
import Shares from "./Shares"

const PollCard = props => {
  // Show additional info and delete button only to poll owners
  const isOwner = props.poll.owner === props.user._id

  return (
    <div>
      <Card className="md-block-centered">
        <CardTitle
          //capitalize first letter of the poll title
          title={props.poll.title}
          subtitle={
            props.user.auth &&
            getTotalVotes(props.poll) +
              " votes since " +
              new Date(props.poll.createdAt).toLocaleString().split(", ")[0]
          }
          onClick={props.onPollClick}
          style={{ cursor: "pointer" }}
        />
        {props.user.auth && (
          <CardActions>
            {isOwner && <Button flat label="Delete" onClick={props.onDelete} />}
            {props.poll.infoUrl && (
              <Button href={props.poll.infoUrl} target="_blank" icon>
                info
              </Button>
            )}
            <Shares title={props.poll.title} poll={props.poll._id} />
          </CardActions>
        )}
      </Card>
    </div>
  )
}

const PollList = props => {
  // Filter list by visibility settings
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

const mapStateToProps = ({ user, polls, visibility }) => ({
  user,
  polls,
  visibility
})

export default connect(mapStateToProps, actions)(withRouter(PollList))
