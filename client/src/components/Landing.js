import React from "react"
import Button from "react-md/lib/Buttons/Button"
import { Link } from "react-router-dom"

export default () => {
  return (
    <div className="landing">
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
