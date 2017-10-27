import React from "react"
import { Link } from "react-router-dom"
import Button from "react-md/lib/Buttons"
import { withAuth } from "../HoCs"

const NewPollBtn = () => (
  <Link to="/polls/new">
    <Button floating secondary fixed>
      add
    </Button>
  </Link>
)

export default withAuth(NewPollBtn)
