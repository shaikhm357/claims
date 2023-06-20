const { claimConstants } = require('../constant')
const { mergeProperties } = require('../utils/index')
const assign = require('lodash/assign')
const formBasicTypes = require('./formBasicTypes')

class FormSchemaComponent {
  constructor(formBasicTypes, applicationMetaData) {
    this.formBasicTypes = formBasicTypes
    this.applicationSchema = undefined
    this.applicationMetaData = applicationMetaData
  }

  prepareClaimSchema() {
    const schema = {
      type: 'object',
      ...mergeProperties({
        clientType: assign(
          {
            title: claimConstants.CLAIM_INTIMATED_BY
          },
          this.formBasicTypes.clientType
        )
      })
    }
    const uiSchema = {}
    return {
      schema,
      uiSchema,
      rules: []
    }
  }
}
const testSchema = new FormSchemaComponent(formBasicTypes)

console.log(JSON.stringify(testSchema.prepareClaimSchema()))
