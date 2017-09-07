import React from "react"
import { Link } from "react-router-dom"
import Button from "react-md/lib/Buttons/Button"
import FontIcon from "react-md/lib/FontIcons"
import Paper from "react-md/lib/Papers"

export const ErrorPage = ({ title, msg }) => (
  <div className="fullscreen error">
      <h2>{title}</h2>
      <p>{msg.toUpperCase()}</p>
  </div>
)

export const Landing = () => (
  <div className="fullscreen landing">
    <Paper zDepth={4}>
      <h1>FCC VOTING APP</h1>
      <Link to="/polls">
        <Button primary raised label="get started" />
      </Link>
    </Paper>
  </div>
)

export const Loader = ({ visible }) => (
  <FontIcon
    className={"loader " + (visible ? "visible" : "hidden")}
    iconClassName="fa fa-circle-o-notch fa-spin"
    style={{ color: "white" }}
  />
)
