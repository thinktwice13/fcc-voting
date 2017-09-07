import React from "react"
import { Link } from "react-router-dom"
import { Field, FieldArray, reduxForm } from "redux-form"
import { connect } from "react-redux"
import * as actions from "../actions"
import { withRouter } from "react-router-dom"
import FormField from "./FormField"
import Button from "react-md/lib/Buttons"
import { validateUrl } from "../utils/helpers"

const renderOptions = ({ fields }) => {
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
    submitPoll(
      {
        ...vals,
        infoUrl: (validateUrl(vals.info) && vals.info) || "",
        options: vals.options.filter(val => !!val)
      },
      history
    )
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

          {/* Needs title, at least two options and valid or empty info URL */}
          {vals.options &&
          vals.options.length > 2 && (
            <Button secondary type="submit" raised label="Submit" />
          )}
        </div>
      )
    }
  }

  return (
    <div className="container md-toolbar-relative">
      <form
        onSubmit={pollSubmit}
        style={{ maxWidth: "700px", margin: "0 auto" }}
      >
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
            <div className="poll-info">
              <h5 className="md-headline">
                More info {<span className="md-body-2">(Optional URL)</span>} :
              </h5>
              <Field name="info" type="text" component={FormField} />
            </div>
            <div>
              <h4 className="md-display-2">Options</h4>
              <FieldArray
                name="options"
                component={renderOptions}
                options={formValues.options}
              />
            </div>
          </div>
        )}
        {renderActionBtns()}
      </form>
    </div>
  )
}

const validate = vals => {
  const errors = {}

  /* Only allow one empty option. If there are no empty options, create one at the end of the array */
  vals.options = vals.options || [""]
  const i = vals.options.findIndex(opt => !opt)
  vals.options = vals.options.filter(opt => !!opt)
  if (i > -1) {
    vals.options.splice(i, 0, "")
  } else {
    vals.options.push("")
  }

  /* validate URLs in info field */
  if (vals.info) {
    if (!validateUrl(vals.info)) {
      errors.info = "Invalid URL"
    }
  }

  return errors
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
