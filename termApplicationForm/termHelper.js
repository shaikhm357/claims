const difference = require('lodash/difference')
const has = require('lodash/has')
const isUndefined = require('lodash/isUndefined')
const { prepareClaimSchema } = require('./data')
// const { dbData } = require('./dbData')
const { dbData } = require('./updatedSchemaDbData')
const FormSchemaComponent = require('../formComponents/formSchemaComponent')
const formBasicTypes = require('../formComponents/formBasicTypes')

const getTermApplicationSchema = async (fastify) => {
  // This collection comes from "mongodb://mongo1/mydb"
  const db = fastify.mongo.db

  // Access a collection
  // const collection = db.collection('counters')
  const collection = db.collection('pincode')

  // Perform database operations
  // const users = await collection.find().toArray()
  const users = await collection.findOne({ Pincode: 400017 })

  //   const allSchema = new FormSchemaComponent(formBasicTypes)
  //   const a = allSchema.prepareClaimSchema()
  return users
}

const getClaimIntimationSchema = (prepareClaimSchema, dbData) => {
  const getFilteredSchema = (prepareClaimSchema, dbData) => {
    let allSchemaName = {}
    allSchemaName.prepareClaimSchema = {}
    allSchemaName.prepareClaimSchema.items = []

    //buld the structure similar to schemamap
    Object.entries(prepareClaimSchema.schema.properties).map(([key, value]) => {
      // console.log(key, '--->', value)
      allSchemaName.prepareClaimSchema.items.push(key)
      if (has(value, 'properties')) {
        allSchemaName[key] = {}
        let allkeys = Object.keys(value.properties)
        allSchemaName[key].items = [...allkeys]
      }
    })
    // console.log(JSON.stringify(allSchemaName, null, 2))
    // console.log(allSchemaName)

    // console.log('\n----------------------------------------------------------------------------------------------------')
    const filterdSchema = function (toRemove, key, dbData, rootSchemaKey) {
      for (let i = 0; i < toRemove.length; i++) {
        if (key === rootSchemaKey) {
          // console.log(prepareClaimSchema.schema.properties[toRemove[i]], 'in delete option-------------------------')
          delete prepareClaimSchema.schema.properties[toRemove[i]]
          delete prepareClaimSchema.uiSchema[toRemove[i]]
        } else {
          if (has(prepareClaimSchema.schema.properties, key)) {
            delete prepareClaimSchema.schema.properties[key].properties[toRemove[i]]
            delete prepareClaimSchema.uiSchema[key][toRemove[i]]
          }
        }
      }
      return prepareClaimSchema
    }

    Object.entries(dbData.schemaMap.prepareClaimSchema).forEach(([key, value]) => {
      let [rootSchemaKey] = Object.keys(dbData.schemaMap)
      if (key === 'items') {
        key = rootSchemaKey
        let temp = value
        value = {}
        value.items = temp
      }
      // console.log(key, '----> ', value)
      if (has(allSchemaName, key)) {
        // console.log(allSchemaName[key]['items'])
        // console.log(allSchemaName[key].items)
        let toRemove = difference(allSchemaName[key]['items'], value.items)
        filterdSchema(toRemove, key, dbData, rootSchemaKey)
      }
    })

    // console.log('///////////////////////////////////////////////////////////////////////////////////////////')
    // console.log(JSON.stringify(prepareClaimSchema, null, 2))
    return prepareClaimSchema
  }
  const filterdSchema = getFilteredSchema(prepareClaimSchema, dbData)

  // console.log(JSON.stringify(filterdSchema, null, 2))
  const pushDdValue = (dbb, schemaValue) => {
    console.log(dbb.length)
    for (let i = 0; i < dbb.length; i++) {
      schemaValue.enum.push(dbb[i].code)
      schemaValue.enumNames.push(dbb[i].description)
    }
  }

  const addDropdownValues = (filterdSchema, dbData) => {
    Object.entries(filterdSchema.schema.properties).forEach(([key, value]) => {
      if (has(value, 'properties')) {
        Object.entries(value.properties).forEach(([nestedKey, nestedValue]) => {
          if (has(nestedValue, 'enum') && !isUndefined(dbData[key][nestedKey])) {
            // console.log('schemaValue======>', nestedValue, '\n')
            // console.log('dbenumlist=====>', dbData[key][nestedKey], '\n')
            pushDdValue(dbData[key][nestedKey], nestedValue)
          }
        })
      }
      if (has(value, 'enum')) {
        // console.log('root key ====>', value)
        // console.log('database===>', dbData[key])
        pushDdValue(dbData[key], value)
      }
    })
    return filterdSchema
  }
  return { applicationForm: addDropdownValues(filterdSchema, dbData.dropDownList) }
}

module.exports = { getTermApplicationSchema, getClaimIntimationSchema }
