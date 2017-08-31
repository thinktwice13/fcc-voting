import React from "react"
import { Link } from "react-router-dom"
import { Field, FieldArray, reduxForm } from "redux-form"
import { connect } from "react-redux"
import * as actions from "../actions"
import { withRouter } from "react-router-dom"

const renderField = ({ input, label }) => (
  <div>
    <label>{label}</label>
    <input {...input} />
  </div>
)

const renderOptions = ({ fields, meta: { touched, error } }) => {
  return (
    <div>
      <div>
        {fields.map((option, i) => (
          <Field
            key={option}
            name={option}
            type="text"
            component={renderField}
            label={"Option " + (i + 1)}
          />
        ))}
      </div>
      <div>
        <button
          className="btn-flat teal white-text"
          type="button"
          onClick={() => fields.push("")}
          style={{ width: "100%", margin: "10px 0" }}
        >
          Add Option
        </button>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  )
}

let PollNew = props => {
  const pollSubmit = formValues => {
    props.submitPoll(formValues, props.history)
  }
  return (
    <form onSubmit={props.handleSubmit(pollSubmit)}>
      <h4>Title</h4>
      <Field name="title" type="text" component={renderField} />
      <h4>Options</h4>
      <FieldArray name="options" component={renderOptions} />
      <Link to="/polls" className="btn-flat red left white-text">
        Cancel
      </Link>
      <button type="submit" className="btn-flat teal right white-text">
        Submit
      </button>
    </form>
  )
}

PollNew = connect(null, actions)(withRouter(PollNew))

export default reduxForm({
  form: "newPollForm"
})(PollNew)
