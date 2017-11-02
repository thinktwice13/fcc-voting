import React from "react"
import { Link } from "react-router-dom"
import { Field, FieldArray, reduxForm } from "redux-form"
import { connect } from "react-redux"
import * as actions from "../actions"
import { withRouter } from "react-router-dom"
import FormField from "../components/FormField"
import Button from "react-md/lib/Buttons"
import FocusContainer from "react-md/lib/Helpers/FocusContainer"
import { unauthRedirect } from "../components/HoCs"
import {
  validateUrl,
  validateNewPoll,
  validateOption,
  normalize
} from "../utils/validate"

/*
New poll form page.
Form is valid if title and >= 2 options entered
*/

// Dynamically render array of option fields depending on empty or repeated user entries
const renderOptions = ({ fields }) => {
  return (
    <div>
      {fields.map((option, i) => (
        <Field
          key={option}
          name={option}
          type="text"
          component={FormField}
          validate={validateOption}
          normalize={normalize}
        />
      ))}
    </div>
  )
}

let PollNew = ({ auth, formValues, submitPoll, history, resetPollForm }) => {
  //TODO use redux validation instead
  const vals = formValues
  // Valid title makes the rest of the poll visible
  const validTitle =
    vals && vals.title && vals.title.length > 0 && vals.title.length <= 56
  // Get value from redux-form 'valid' prop
  const validForm = validTitle && vals.options && vals.options.length > 2

  // Submit poll action
  const pollSubmit = ev => {
    ev.preventDefault()
    submitPoll(
      {
        ...vals,
        infoUrl: (!validateUrl(vals.info) && vals.info) || "",
        options: vals.options.filter(val => !!val)
      },
      history
    )
  }

  /**
   * Dynamically render CANCEL, RESET and SUBMIT buttons.
   * Show CANCEL only if all fields are empty. Otherwise show RESET.
   * Show SUBMIT button only for valid forms
   */
  const renderActionBtns = () => {
    const vals = formValues

    // Cancel button condition
    if (!vals) {
      return (
        <Link to="/polls">
          <Button raised primary children="Cancel" />
        </Link>
      )
    }

    // SUBMIT and/or RESET button condition
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Button raised primary children="Reset" onClick={resetPollForm} />
        {validForm && (
          <Button secondary type="submit" raised children="Submit" />
        )}
      </div>
    )
  }

  return (
    <div className="container">
      <div className="md-toolbar-relative">
        <FocusContainer
          focusOnMount
          component="form"
          onSubmit={pollSubmit}
          style={{ maxWidth: "700px", margin: "0 auto" }}
        >
          <h4 className="md-display-2 md-font-semibold">Title</h4>
          <Field
            name="title"
            size="title"
            placeholder="Poll Title"
            type="text"
            normalize={normalize}
            component={FormField}
          />
          {vals && (
            <div>
              <div className="poll-info">
                <h5 className="md-headline md-font-semibold">
                  More info {
                    <span className="md-body-2">(Optional URL)</span>
                  }{" "}
                  :
                </h5>
                <Field
                  name="info"
                  type="text"
                  normalize={normalize}
                  warn={validateUrl}
                  component={FormField}
                />
              </div>
              <div>
                <h4 className="md-display-2 md-font-semibold">Options</h4>
                <FieldArray
                  name="options"
                  component={renderOptions}
                  options={formValues.options}
                />
              </div>
            </div>
          )}
          {renderActionBtns()}
        </FocusContainer>
      </div>
    </div>
  )
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
  validate: validateNewPoll,
  destroyOnUnmount: false
})(unauthRedirect(PollNew))
