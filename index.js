require('dotenv').config()
const { pinoTransportLogger, fastifyDbPlugin, oaErrors, apmWrapper } = require('oneaccess-infra')
const packagesJson = require('./package.json')
const config = require('config')
const { apm } = apmWrapper(packagesJson.name)
const fastify = require('fastify')({
  logger: {
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    stream: pinoTransportLogger(packagesJson.name),
    redact: ['req.headers.authorization']
  }
})
fastify.decorate('config', config)
fastify.decorate('apm', apm)
fastify.log.debug('Registering mongoDb @fastify/mongodb')
fastify.register(require('@fastify/mongodb'), {
  url: fastify.config.get('databases.mongo')
})
fastify.log.debug('Registering route: GET /pincode/:id')
fastify.get('/pincode/:id', async (req, reply) => {
  try {
    const pincode = req.params.id
    const db = fastify.mongo.db
    const collection = db.collection('pincode')

    const pinCodeDetails = await collection.findOne({ Pincode: Number(pincode) })
    reply.code(200).send(pinCodeDetails)
  } catch (err) {
    console.log(err)
  }
})

fastify.register(require('./termApplicationForm/index'))

fastify.listen({ port: fastify.config.get('claimService.port'), host: fastify.config.get('claimService.host') }, (err) => {
  if (err) {
    fastify.log.error('index', 'Fastify start error', {
      code: oaErrors.FastifyStartError,
      stack: err.stack,
      message: err.message
    })
  }
  fastify.log.info('index', `Server listening on ${fastify.server.address().port}`)
})
