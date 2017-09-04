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

const renderOptions = props => {
  const { fields, options, meta: { touched, error } } = props
  return (
    <div>
      <div>
        {fields.map((option, i) => (
          <Field
            key={option}
            name={option}
            type="text"
            component={renderField}
          />
        ))}
      </div>
    </div>
  )
}

let PollNew = ({ formValues, submitPoll, history, resetPollForm }) => {
  const pollSubmit = ev => {
    ev.preventDefault()
    const vals = formValues
    submitPoll({ ...vals, options: vals.options.filter(val => !!val) }, history)
  }

  const renderActionBtns = () => {
    const vals = formValues

    //if all fields are empty, show only cancel button
    if (!vals) {
      return (
        <Link to="/polls" className="btn-flat red left white-text">
          Cancel
        </Link>
      )
    }
    //if anying entered, show reset button
    if (vals) {
      return (
        <div>
          <button
            className="btn-flat red left white-text"
            onClick={resetPollForm}
          >
            Reset
          </button>
          {/*if title and at least two option entered, show submit button*/}
          {vals.title &&
          vals.options.length > 2 && (
            <button type="submit" className="btn-flat teal right white-text">
              Submit
            </button>
          )}
        </div>
      )
    }
  }

  return (
    <form onSubmit={pollSubmit}>
      <h4>Title</h4>
      <Field name="title" type="text" component={renderField} />
      {formValues && (
        <div>
          <h4>Options</h4>
          <FieldArray
            name="options"
            component={renderOptions}
            options={formValues.options}
          />
        </div>
      )}
      {renderActionBtns()}
    </form>
  )
}

const validate = vals => {
  vals.options = vals.options || [""]
  //alway keep one empty option field
  if (!vals.options.includes(undefined) && !vals.options.includes("")) {
    vals.options[vals.options.length] = ""
  }
  if (
    vals.options.includes(undefined) &&
    vals.options[vals.options.length - 1] === ""
  ) {
    vals.options.splice(-1)
  }

  //TODO only allow one empty option field

  return vals
}

PollNew = connect(
  state => ({
    formValues: state.form.newPollForm && state.form.newPollForm.values
  }),
  actions
)(withRouter(PollNew))

export default reduxForm({
  form: "newPollForm",
  validate,
  destroyOnUnmount: false
})(PollNew)
