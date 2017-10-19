import React from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

export default ChildComponent => {
  const withAuth = props => {
    const { user } = props
    if (!user) return null
    if (!user.auth) return <Redirect to="/" />
    return <ChildComponent {...props} />
  }

  return connect(({ user }) => ({ user }))(withAuth)
}
