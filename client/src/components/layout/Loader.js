import React from "react"
import FontIcon from "react-md/lib/FontIcons"

export default ({ visible }) => (
  <FontIcon
    className={"loader " + (visible ? "visible" : "hidden")}
    iconClassName="fa fa-circle-o-notch fa-spin"
    style={{ color: "white" }}
  />
)
