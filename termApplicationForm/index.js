// const { getTermApplicationSchema } = require('./termHelper')
const { isUndefined } = require('lodash')
const termHelper = require('./termHelper')

async function routes(fastify, optons, done) {
  fastify.log.debug('Registering route: GET /claim/:insuranceType/getClaimSchema')
  fastify.get('/claim/:insuranceType/getClaimSchema', async (req, reply) => {
    try {
      const { insuranceType } = req.params
      if (isUndefined(insuranceType)) {
        throw new Error('insuranceType is Required')
      }
      const termApplicationSchemas = await termHelper.getTermApplicationSchema(fastify, insuranceType)
      reply.code(200).send(termApplicationSchemas)
    } catch (err) {
      console.log(err)
    }
  })
  //console.log(collection)
  done()
}
module.exports = routes
