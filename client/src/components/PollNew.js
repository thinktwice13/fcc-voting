import React from "react"
import { Link } from "react-router-dom"
import { Field, FieldArray, reduxForm } from "redux-form"

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

const PollNew = props => {
  return (
    <form>
      <h4>Title</h4>
      <Field
        name="pollTitle"
        type="text"
        component={renderField}
        label="Title"
      />
      <h4>Options</h4>
      <FieldArray name="options" component={renderOptions} />
      <a className="btn-flat red left white-text">Cancel</a>
      <a className="btn-flat teal right white-text">Submit</a>
    </form>
  )
}

export default reduxForm({
  form: "pollNewForm"
})(PollNew)
