import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

class Header extends React.Component {
  renderContent() {
    switch (this.props.user) {
      case null:
        return
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        )
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        )
    }
  }
  render() {
    console.log("Props: ", this.props)
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
