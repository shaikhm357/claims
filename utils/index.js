const merge = require('lodash/merge')
function mergeProperties() {
  const merged = {
    properties: {},
    required: []
  }
  // every argument is a {key: value},
  // value can be a item or another object
  for (let i = 0; i < arguments.length; i++) {
    const property = arguments[i]
    merged.properties = merge(merged.properties, property)
  }
  merged.required = Object.keys(merged.properties)
  return merged
}

module.exports = {
  mergeProperties
}
