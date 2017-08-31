import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

const PollList = props => {
  const pollNewBtn = () => {
    if (props.user) {
      return (
        <div className="fixed-action-btn">
          <Link to="/polls/new" className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </Link>
        </div>
      )
    }
  }
  return (
    <div>
      <h2>PollList Here!</h2>
      {pollNewBtn()}
    </div>
  )
}

const mapStateToProps = ({ user }) => {
  return { user }
}

export default connect(mapStateToProps)(PollList)
