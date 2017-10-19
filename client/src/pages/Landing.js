import React from "react"
import Paper from "react-md/lib/Papers"
import { Link } from "react-router-dom"
import Button from "react-md/lib/Buttons/Button"

export default () => (
  <div className="fullscreen landing">
    <Paper zDepth={4}>
      <h1>FCC VOTING APP</h1>
      <Link to="/polls">
        <Button primary raised label="get started" />
      </Link>
    </Paper>
  </div>
)
