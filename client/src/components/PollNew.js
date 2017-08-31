import React from "react"
import { reduxForm } from "redux-form"

class PollNew extends React.Component {
  render() {
    return (
      <div>Poll New Forms</div>
    )
  }
}

export default reduxForm({
  form: "pollForm"
})(PollNew)
