import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { connect } from "react-redux"
import { fetchUser } from "../actions"
import Header from "./layout/Header"
import Footer from "./layout/Footer"
import Landing from "../pages/Landing"
import Dashboard from "../pages/Dashboard"
import PollView from "../pages/PollView"
import PollNew from "../pages/PollNew"

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

export default connect(null, { fetchUser })(App)
