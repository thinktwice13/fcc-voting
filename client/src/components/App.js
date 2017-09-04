import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { connect } from "react-redux"
import * as actions from "../actions"
import Header from "./Header"
import Dashboard from "./Dashboard"
import PollNew from "./PollNew"
import PollView from "./PollView"

const Landing = () => <h2>Landing</h2>

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
              <Route path="/polls/view/:id" component={PollView} />
              <Route path="/polls/new" component={PollNew} />
              <Route
                exact
                path="/polls"
                component={Dashboard}
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
