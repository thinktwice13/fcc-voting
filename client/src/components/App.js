import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { connect } from "react-redux"
import * as actions from "../actions"
import Header from "./Header"
import Dashboard from "./Dashboard"
import PollNew from "./PollNew"
import PollView from "./PollView"
import Footer from "./Footer"
import { Landing } from "./helpers"

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser()
  }
  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <div className="content">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route path="/polls/view/:id" component={PollView} />
            <Route path="/polls/new" component={PollNew} />
            <Route
              exact
              path="/polls"
              component={Dashboard}
              user={this.props.user}
            />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(null, actions)(App)
