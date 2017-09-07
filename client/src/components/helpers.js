import React from "react"
import Button from "react-md/lib/Buttons/Button"
import { Link } from "react-router-dom"
import FontIcon from "react-md/lib/FontIcons"

export const ErrorPage = ({ title, msg }) => (
  <div className="fullscreen error">
    <h3>{title}</h3>
    <p className="md-subheading-2 md-font-medium">{msg.toUpperCase()}</p>
  </div>
)

export const Landing = () => {
  return (
    <div className="fullscreen landing">
      <h1 className="md-display-1">FCC VOTING APP</h1>
      <Link to="/polls">
        <Button
          primary
          raised
          size={50}
          label="get started"
          className="btn-big"
        />
      </Link>
    </div>
  )
}

export const Loader = ({ visible }) => {
  return (
    <FontIcon
      className={"loader " + (visible ? "visible" : "hidden")}
      iconClassName="fa fa-circle-o-notch fa-spin"
      style={{ color: "white" }}
    />
  )
}
