import React from "react"
import { BrowserRouter, Route } from "react-router-dom"

import Header from "./Header"
const Landing = () => <h2>Landing</h2>
const PollList = () => <h2>PollList</h2>
const Poll = () => <h2>Poll</h2>
const PollNew = () => <h2>PollNew</h2>
const PollView = () => <h2>PollView</h2>

export default () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <div className="container">
            <Route path="/polls/new" component={PollNew} />
            <Route path="/polls/id" component={PollView} />
            <Route exact path="/polls" component={PollList} />
            <Route exact path="/" component={Landing} />
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}
