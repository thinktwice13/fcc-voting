import React from "react"
import NewPollBtn from "../components/layout/NewPollBtn"

export default ({ title, msg }) => (
  <div>
    <div className="fullscreen error">
      <h2>{title && title}</h2>
      <p>{msg && msg.toUpperCase()}</p>
    </div>
    <NewPollBtn />
  </div>
)
