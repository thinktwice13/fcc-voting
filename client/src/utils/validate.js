export const normalize = val => (val && val.trim() === "" ? "" : val)

/**
 * Validate new poll entries
 * @param {object} vals - All ne wpoll ofrm inputs
 * @param {array} vals.options
 * @param {string} vals.title
 * @returns {object} errors
 */
export const validateNewPoll = vals => {
  let errors = {}

  // Validate title
  let title = vals.title
  errors.title =
    title && title.length > 56 ? "Must be 56 characters or less" : undefined

  /* 
  Filter duplicates and Only allow one empty option. 
  If there are no empty options, create one at the end of the array 
  */
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

/**
 * Validate poll option inputs
 * @returns {object} errors
 */
export const validateOption = (value, allVals, { optionLabels }) => {
  const opts = optionLabels || []
  const val = value && value.toUpperCase().trim()
  return val && val.length > 56
    ? "Must be 56 characters or less"
    : opts.includes(val) ? "Already exists" : undefined
}

// URL validation
export const validateUrl = url => {
  const re = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
  return re.test(url) || !url ? undefined : "Invalid URL"
}
