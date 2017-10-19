import React from "react"
import { Field, reduxForm, formValueSelector } from "redux-form"
import { connect } from "react-redux"
import FormField from "./FormField"
import Button from "react-md/lib/Buttons/Button"
import { validateOption, normalize } from "../utils/validate"

let PollOptionNew = props => (
  <form
    onSubmit={props.handleSubmit(() => props.onOptionSubmit(props.newOption))}
  >
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
          children="Submit"
        />
      </div>
    )}
  </form>
)

const selector = formValueSelector("newOptionForm")

// Run new poll option through redux-form
PollOptionNew = reduxForm({
  form: "newOptionForm"
})(PollOptionNew)

PollOptionNew = connect((state, ownProps) => ({
  newOption: selector(state, "newOption"),
  optionLabels: ownProps.optionLabels
}))(PollOptionNew)

export default PollOptionNew
