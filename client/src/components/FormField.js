import React from "react"
import TextField from "react-md/lib/TextFields"

export default ({ size, input, label }) => (
  <TextField
    {...input}
    id={input.name}
    size={10}
    customSize={size}
    lineDirection="right"
    label={label}
    className="md-cell md-cell--bottom"
  />
)
