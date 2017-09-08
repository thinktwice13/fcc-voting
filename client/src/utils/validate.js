export const normalize = val => (val && val.trim() === "" ? "" : val)

export const validateNewPoll = vals => {
  let errors = {}

  //title validation
  let title = vals.title
  errors.title =
    title && title.length > 56 ? "Must be 56 characters or less" : undefined

  /* filter duplicates and Only allow one empty option. If there are no empty options, create one at the end of the array */
  vals.options = vals.options || [""]
  const i = vals.options.findIndex(opt => !opt)
  vals.options = vals.options.filter((opt, i) => {
    if (opt === " ") opt = ""
    return !!opt
  })
  if (i > -1) {
    vals.options.splice(i, 0, "")
  } else {
    vals.options.push("")
  }

  return errors
}

export const validateOption = (val, allVals, { optionLabels }) => {
  const opts = optionLabels || []
  return val && val.length > 56
    ? "Must be 56 characters or less"
    : opts.includes(val) ? "Already exists" : undefined
}

export const validateUrl = url => {
  const re = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/

  return re.test(url) || !url ? undefined : "Invalid URL"
}
