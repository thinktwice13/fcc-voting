import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import ErrorPage from "../pages/ErrorPage"

export const withAuth = ChildComponent =>
  connect(({ user }) => ({ user }))(
    props =>
      props.user && props.user.auth 
        ? <ChildComponent {...props} /> 
        : null
  )

export const unauthRedirect = ChildComponent =>
  connect(({ user }) => ({ user }))(
    props =>
      props.user && props.user.auth 
        ? <ChildComponent {...props} />
        : <Redirect to="/" />
  )

export const DashboardOrError = Dashboard => {
  const EnhancedComponent = props => {
    const { user, polls } = props
    if (!user || !polls) return null
    if (!polls.length) {
      return (
        <div>
          <ErrorPage
            title="No polls found :("
            msg={
              user.auth
                ? "Add one yourself or try again later"
                : "Login and add one yourself or try again later"
            }
          />
        </div>
      )
    }
    return <Dashboard {...props} />
  }
  const mapStateToProps = ({ user, polls }) => ({ user, polls })
  return connect(mapStateToProps)(EnhancedComponent)
}

export const withIdMatch = PollView =>
  connect(({ polls }) => ({ polls }))(
    props =>
      !props.polls
        ? null
        : !!props.polls.find(poll => poll._id === props.match.params.id) 
          ? <PollView {...props} />
          : <ErrorPage title="404 NOT FOUND" />
  )
