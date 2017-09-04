import React from "react"
import { Field, reduxForm, formValueSelector } from "redux-form"
import { connect } from "react-redux"
import FormField from "./FormField"
import Button from "react-md/lib/Buttons/Button"

let PollOptionNew = props => {
  const onFormSubmit = () => {
    // ev.preventDefault()
    props.onOptionSubmit(props.newOption)
  }
  return (
    <form onSubmit={props.handleSubmit(onFormSubmit)}>
      {props.canAddOption && (
        <Field
          name="newOption"
          type="text"
          component={FormField}
          label="New Option"
        />
      )}
      {props.newOption && (
        <Button
          raised
          primary
          type="submit"
          label="Submit"
          className="btn-wide"
        />
      )}
    </form>
  )
}

const selector = formValueSelector("newOptionForm")

PollOptionNew = reduxForm({
  form: "newOptionForm"
})(PollOptionNew)

PollOptionNew = connect(state => ({ newOption: selector(state, "newOption") }))(
  PollOptionNew
)

export default PollOptionNew
