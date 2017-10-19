import React from "react"

export default ({ title, msg }) => (
  <div className="fullscreen error">
    <h2>{title}</h2>
    <p>{msg.toUpperCase()}</p>
  </div>
)
