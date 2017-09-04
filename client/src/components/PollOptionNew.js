import React from "react"
import { Field, reduxForm, formValueSelector } from "redux-form"
import { connect } from "react-redux"

const renderField = ({ input, label }) => (
  <div>
    {label && <label>{label}</label>}
    <input {...input} />
  </div>
)

// const ItemList = formValues({ showVat: "withVat" })(MyItemizedList)

let PollOptionNew = props => {
  const onFormSubmit = () => {
    // ev.preventDefault()
    props.onOptionSubmit(props.newOption)
  }
  return (
    <form onSubmit={props.handleSubmit(onFormSubmit)}>
      <Field
        name="newOption"
        type="text"
        component={renderField}
        label="New Option"
      />
      {props.newOption && (
        <button type="submit" className="btn teal white-text">
          Submit
        </button>
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
