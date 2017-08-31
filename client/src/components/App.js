import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { connect } from "react-redux"
import * as actions from "../actions"
import PollList from "./PollList"
import PollNew from "./PollNew"

import Header from "./Header"
const Landing = () => <h2>Landing</h2>
const PollView = () => <h2>PollView</h2>

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser()
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
              <Route path="/polls/new" component={PollNew} />
              <Route path="/polls/id" component={PollView} />
              <Route
                exact
                path="/polls"
                component={PollList}
                user={this.props.user}
              />
              <Route exact path="/" component={Landing} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions)(App)
