import React from "react"
import NewPollBtn from "../components/layout/NewPollBtn"

export default ({ title, msg }) => (
  <div>
    <div className="fullscreen error">
      <h2>{title}</h2>
      <p>{msg.toUpperCase()}</p>
    </div>
    <NewPollBtn />
  </div>
)
