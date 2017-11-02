import React from "react"
import TextField from "react-md/lib/TextFields"
import FontIcon from "react-md/lib/FontIcons"
import IconSeparator from "react-md/lib/Helpers/IconSeparator"


// Determine received form info (error or warning) and display with appropriate styling
const FormInfo = ({ error, warning }) => {
  const text = error || warning
  const type = error ? "error" : "warning"
  const color = { color: error ? "#c62828" : "#cddc39" }
  return (
    <div className={"form-info " + type + " "} style={color}>
      <IconSeparator label={text} iconBefore>
        <FontIcon style={color}>{type}</FontIcon>
      </IconSeparator>
    </div>
  )
}

export default ({
  size,
  input,
  label,
  meta: { visited, touched, dirty, error, warning }
}) => {
  const formAlert = <FormInfo error={error} warning={warning} />
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
      {((error && (visited || dirty)) || (warning && touched)) && formAlert}
    </div>
  )
}
