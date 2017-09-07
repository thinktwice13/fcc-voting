import React from "react"
import TextField from "react-md/lib/TextFields"

export default ({ size, input, label, meta: { touched, error } }) => {
  return (
    <div>
      <TextField
        {...input}
        id={input.name}
        customSize={size}
        lineDirection="right"
        label={label}
        className="md-cell md-cell--bottom"
      />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  )
}
