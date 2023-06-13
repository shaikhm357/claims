const { applyRules } = require('react-jsonschema-form-conditionals')
const Engine = require('json-rules-engine-simplified')
const Form = require('react-jsonschema-form')

const schema = {
  type: 'object',
  properties: {
    userType: {
      type: 'string',
      enum: ['client', 'non-client']
    }
  }
}

const uiSchema = {
  userType: {
    'ui:widget': 'radio',
    'ui:options': {
      inline: true // Display radio buttons inline
    }
  }
}

let rules = [
  {
    type: 'remove',
    params: {
      field: 'name'
    }
  }
]

let FormWithConditionals = applyRules(schema, uiSchema, rules, Engine)(Form)
