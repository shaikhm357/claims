const difference = require('lodash/difference')
const has = require('lodash/has')
const isUndefined = require('lodash/isUndefined')
const FormSchemaComponent = require('../formComponents/formSchemaComponent')
const formBasicTypes = require('../formComponents/formBasicTypes')
const { mergeAllSchema } = require('../utils')

let termHelper
class TermHelper {
  constructor(app) {
    this.app = app
  }

  getFilteredSchema(prepareClaimSchema, dbData, schemaName) {
    try {
      let allSchemaName = {}
      allSchemaName[schemaName] = {}
      allSchemaName[schemaName].items = []

      //buld the structure similar to schemamap
      Object.entries(prepareClaimSchema[schemaName].schema.properties).map(([key, value]) => {
        // console.log(key, '--->', value)
        allSchemaName[schemaName].items.push(key)
        if (has(value, 'properties')) {
          allSchemaName[key] = {}
          let allkeys = Object.keys(value.properties)
          allSchemaName[key].items = [...allkeys]
        }
      })

      const filterdSchema = function (toRemove, key, dbData, rootSchemaKey) {
        for (let i = 0; i < toRemove.length; i++) {
          if (key === rootSchemaKey) {
            // console.log(prepareClaimSchema.schema.properties[toRemove[i]], 'in delete option-------------------------')
            delete prepareClaimSchema[schemaName].schema.properties[toRemove[i]]
            delete prepareClaimSchema[schemaName].uiSchema[toRemove[i]]
          } else {
            if (has(prepareClaimSchema[schemaName].schema.properties, key)) {
              delete prepareClaimSchema[schemaName].schema.properties[key].properties[toRemove[i]]
              delete prepareClaimSchema[schemaName].uiSchema[key][toRemove[i]]
            }
          }
        }
        return prepareClaimSchema
      }

      Object.entries(dbData.schemaMap[schemaName]).forEach(([key, value]) => {
        if (key === 'items') {
          key = schemaName
          let temp = value
          value = {}
          value.items = temp
        }
        // console.log(key, '----> ', value)
        if (has(allSchemaName, key)) {
          let toRemove = difference(allSchemaName[key]['items'], value.items)
          filterdSchema(toRemove, key, dbData, schemaName)
        }
      })
      return prepareClaimSchema
    } catch (err) {
      console.log(err)
    }
  }

  getClaimSchema(prepareClaimSchema, dbData, schemaName) {
    try {
      const filterdSchema = this.getFilteredSchema(prepareClaimSchema, dbData, schemaName)
      // console.log(JSON.stringify(filterdSchema, null, 2))
      const pushDdValue = (dbb, schemaValue) => {
        if (!isUndefined(dbb)) {
          for (let i = 0; i < dbb.length; i++) {
            schemaValue.enum.push(dbb[i].code)
            schemaValue.enumNames.push(dbb[i].description)
          }
        }
      }
      // passing dbData for dd values as dbData.dropDownList
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
            pushDdValue(dbData[key], value)
          }
        })
        return filterdSchema
      }
      return addDropdownValues(filterdSchema[schemaName], dbData.dropDownList)
    } catch (err) {
      console.error(err)
    }
  }

  getAllSchema(mehodNames, prepareClaimSchema, allSchema, dbData) {
    try {
      for (let i = 0; i < mehodNames.length; i++) {
        const schema = prepareClaimSchema[mehodNames[i]]()
        allSchema[mehodNames[i]] = this.getClaimSchema({ [mehodNames[i]]: schema }, dbData, mehodNames[i].toString())
      }
    } catch (err) {
      console.log(err)
    }
  }

  async getTermApplicationSchema(insuranceType) {
    try {
      const allSchema = {}
      let mehodNames = []
      const db = this.app.mongo.db
      const collection = db.collection('claimApplicationForms')
      const dbData = await collection.findOne({ insuranceType: insuranceType })
      if (!dbData) {
        throw new Error('Failed to find Data in db collection')
      }
      const prepareClaimSchema = new FormSchemaComponent(formBasicTypes)
      mehodNames.push(prepareClaimSchema.prepareIntimationSchema.name)
      mehodNames.push(prepareClaimSchema.prepareDocUploadSchema.name)
      this.getAllSchema(mehodNames, prepareClaimSchema, allSchema, dbData)
      const finalSchema = mergeAllSchema(allSchema)
      return { claimApplicationForm: finalSchema }
    } catch (err) {
      console.error(err)
    }
  }
}

TermHelper.create = (app) => {
  if (isUndefined(termHelper)) {
    termHelper = new TermHelper(app)
    app.log.debug('TermHelper:create : Created new termHelper')
  }
  return termHelper
}

module.exports = TermHelper
