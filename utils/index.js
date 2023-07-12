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

const mergeAllSchema = (allSchema) => {
  let finalSchema = { schema: {}, uiSchema: {}, rules: [] }
  let required = []
  let rule = []
  let uiorder = []
  // console.log(JSON.stringify(allSchema, null, 2))
  Object.entries(allSchema).forEach(([key, value]) => {
    finalSchema = merge({}, finalSchema, value)
    required.push(...value.schema.required)
    rule.push(...value.rules)
    uiorder.push(...value.uiSchema['ui:order'])
  })
  finalSchema.schema.required = required
  finalSchema.rules = rule
  finalSchema.uiSchema['ui:order'] = uiorder

  return finalSchema
}

module.exports = {
  mergeProperties,
  mergeAllSchema
}
