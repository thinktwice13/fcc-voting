import React from "react"
import { Field, reduxForm, formValueSelector } from "redux-form"
import { connect } from "react-redux"
import FormField from "./FormField"
import Button from "react-md/lib/Buttons/Button"
import { validateOption, normalize } from "../utils/validate"

let PollOptionNew = props => {
  let formData = props.newOption && props.newOption.trim()
  return (
    <form onSubmit={props.handleSubmit(() => props.onOptionSubmit(formData))}>
      {props.canAddOption && (
        <div className="new-opt">
          <Field
            name="newOption"
            type="text"
            label="New Option"
            normalize={normalize}
            validate={validateOption}
            component={FormField}
            optionLabels={props.optionLabels}
          />
          <Button
            className="btn-wide"
            style={{
              visibility: props.dirty && props.valid ? "visible" : "hidden"
            }}
            raised
            primary
            type="submit"
            label="Submit"
          />
        </div>
      )}
    </form>
  )
}

const selector = formValueSelector("newOptionForm")

PollOptionNew = reduxForm({
  form: "newOptionForm"
})(PollOptionNew)

PollOptionNew = connect(state => ({
  newOption: selector(state, "newOption"),
  optionLabels: state.details.options.map(
    opt => opt.label && opt.label.toLowerCase()
  )
}))(PollOptionNew)

export default PollOptionNew
