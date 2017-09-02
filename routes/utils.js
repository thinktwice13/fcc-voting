const publicip = require("public-ip")

module.exports = headers => {
  const combineHeaders = ip => {
    return (ip +
      headers["accept-language"].split(".")[0] +
      headers["user-agent"].split(/[\(\)]/)[1]).replace(/[^0-9a-z]/gi, "")
  }
  return publicip
    .v4()
    .then(ip => {
      return combineHeaders(ip)
    })
    .catch(err => {
      return combineHeaders(headers.remoteAddress)
    })
}
