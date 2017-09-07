import React from "react"
import FontIcon from "react-md/lib/FontIcons"

export default ({ visible }) => {
  return (
    <FontIcon
      className={"loader " + (visible ? "visible" : "hidden")}
      iconClassName="fa fa-circle-o-notch fa-spin"
      style={{ color: "white" }}
    />
  )
}
