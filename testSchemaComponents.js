const formBasicTypes = require('./formComponents/formBasicTypes')
const FormSchemaComponent = require('./formComponents/formSchemaComponent')

const instance = new FormSchemaComponent(formBasicTypes)
const printSchema = instance.prepareClaimSchema()

console.log(JSON.stringify(printSchema, null, 2))
