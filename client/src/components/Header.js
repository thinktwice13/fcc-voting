import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import Loader from "./Loader"

class Header extends React.Component {
  renderContent() {
    const user = this.props.user

    if (!user) {
      return
    } else if (!user.auth) {
      return (
        <li>
          <a href="/auth/google">Login with Google</a>
        </li>
      )
    } else {
      return (
        <li>
          <a href="/api/logout">Logout</a>
        </li>
      )
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.user ? "/polls" : "/"}
            className="brand-logo center"
          >
            FCC Voting App
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return { user }
}

export default connect(mapStateToProps)(Header)
