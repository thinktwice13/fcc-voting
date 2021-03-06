import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import Loader from "./Loader"
import Toolbar from "react-md/lib/Toolbars"
import Button from "react-md/lib/Buttons"

const Header = ({ user, loading }) => {
  const renderLoginBtn = () => {
    if (!user) {
    } else if (!user.auth) {
      return <Button href="/auth/google" flat children="Login with Google" />
    } else {
      return <Button href="/api/logout" flat children="Logout" />
    }
  }

  const titleRedirect = () => (
    <Link to="/polls" className="titleLink">
      FCC Voting App
    </Link>
  )
  return (
    <Toolbar
      fixed
      colored
      title={titleRedirect()}
      actions={[<Loader visible={loading} />, renderLoginBtn()]}
    />
  )
}

export default connect(({ loading, user }) => ({ loading, user }))(Header)
