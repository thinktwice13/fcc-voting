import React from "react"
import { Link } from "react-router-dom"
import { Field, FieldArray, reduxForm } from "redux-form"
import { connect } from "react-redux"
import * as actions from "../actions"
import { withRouter } from "react-router-dom"
import FormField from "./FormField"
import Button from "react-md/lib/Buttons"

const renderOptions = props => {
  const { fields, options, meta: { touched, error } } = props
  return (
    <div>
      {fields.map((option, i) => (
        <Field key={option} name={option} type="text" component={FormField} />
      ))}
    </div>
  )
}

let PollNew = ({ auth, formValues, submitPoll, history, resetPollForm }) => {
  if (!auth) {
    history.push("/")
  }

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
        <Link to="/polls">
          <Button raised primary label="Cancel" />
        </Link>
      )
    }
    //if anying entered, show reset button
    if (vals) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Button raised primary label="Reset" onClick={resetPollForm} />

          {/*if title and at least two option entered, show submit button*/}
          {vals.title &&
          vals.options.length > 2 && (
            <Button secondary type="submit" raised label="Submit" />
          )}
        </div>
      )
    }
  }

  return (
    <form onSubmit={pollSubmit} style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h4 className="md-display-2">Title</h4>
      <Field
        name="title"
        size="title"
        placeholder="Poll Title"
        type="text"
        component={FormField}
      />
      {formValues && (
        <div>
          <h4 className="md-display-2">Options</h4>
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
    formValues: state.form.newPollForm && state.form.newPollForm.values,
    auth: state.user && state.user.auth
  }),
  actions
)(withRouter(PollNew))

export default reduxForm({
  form: "newPollForm",
  validate,
  destroyOnUnmount: false
})(PollNew)
