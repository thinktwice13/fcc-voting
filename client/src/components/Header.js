import React from "react"

export default class extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo center">
            FCC Voting App
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="">Login Button</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
