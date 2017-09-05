import React from "react"
import { Field, reduxForm, formValueSelector } from "redux-form"
import { connect } from "react-redux"
import FormField from "./FormField"
import Button from "react-md/lib/Buttons/Button"

let PollOptionNew = props => (
  <form
    onSubmit={props.handleSubmit(() => props.onOptionSubmit(props.newOption))}
  >
    {props.canAddOption && (
      <Field
        name="newOption"
        type="text"
        label="New Option"
        component={FormField}
      />
    )}
    {props.newOption && (
      <Button
        className="btn-wide"
        raised
        primary
        type="submit"
        label="Submit"
        className="btn-wide"
      />
    )}
  </form>
)

const selector = formValueSelector("newOptionForm")

PollOptionNew = reduxForm({
  form: "newOptionForm"
})(PollOptionNew)

PollOptionNew = connect(state => ({ newOption: selector(state, "newOption") }))(
  PollOptionNew
)

export default PollOptionNew
