import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import Toolbar from "react-md/lib/Toolbars"
import Button from "react-md/lib/Buttons"
import { Loader } from "./helpers"

const Header = ({ user, loading }) => {
  const renderLoginBtn = () => {
    if (!user) {
    } else if (!user.auth) {
      return <Button href="/auth/google" flat label="Login with Google" />
    } else {
      return <Button href="/api/logout" flat label="Logout" />
    }
  }

  const titleRedirect = () => (
    <Link to="/" style={{ textDecoration: "none" }}>
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

const mapStateToProps = ({ loading, user }) => {
  return { loading, user }
}

export default connect(mapStateToProps)(Header)
