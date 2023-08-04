const fp = require('fastify-plugin')
const TermHelper = require('./termHelper')

module.exports = fp((fastify, opts, next) => {
  // Decorate with the helper
  fastify.register(
    fp((fastify, opts, done) => {
      const termHelper = TermHelper.create(fastify)
      fastify.decorate('termHelper', termHelper)
      fastify.log.debug({ index: 'Created helper' })
      done()
    })
  )
  fastify.register(registerRoutes)
  next()
})

const registerRoutes = (fastify, opts, done) => {
  fastify.log.debug({ 'getClaimSchema/index': 'Registering route: GET /claim/:insuranceType/getClaimSchema' })

  fastify.log.debug({ 'getClaimSchema/index': 'Registering route: GET /claim/:insuranceType/getClaimSchema' })
  fastify.route({
    method: 'GET',
    url: '/claim/:insuranceType/getClaimSchema',
    schema: {
      description: 'Generate Schema ',
      tags: ['Claim Service'],
      summary: 'Generate claim schema',
      params: {
        type: 'object'
      },
      response: {
        200: {
          type: 'object',
          description: 'schema generated',
          properties: {
            claimApplicationForm: {
              schema: {
                type: 'object'
              },
              uiSchema: {
                type: 'object'
              },
              rules: {
                type: 'array'
              }
            }
          }
        }
      }
    },
    handler: async (req, resp) => {
      const { termHelper } = fastify
      const {
        params: { insuranceType }
      } = req
      if (!insuranceType) {
        throw new Error('insuranceType is Required')
      }
      const response = await termHelper.getTermApplicationSchema(insuranceType)
      resp.send(response).code(200)
    },
    beforeHandler: (req, reply, done) => {
      done()
    }
  })

  fastify.log.debug({ 'Claim Service': 'Completed registering routes collections' })
  done()
}
