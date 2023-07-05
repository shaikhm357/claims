const { getTermApplicationSchema } = require('./termHelper')

async function routes(fastify, optons, done) {
  fastify.get('/', async (req, reply) => {
    reply.send({ hello: 'world' })
  })

  fastify.get('/getClaimSchema', async (req, reply) => {

    // const allSchema = new FormSchemaComponent(formBasicTypes)
    // const a = allSchema.prepareClaimSchema()

    // reply.send({ allSchema: a })

    const users = await getTermApplicationSchema(fastify)

    reply.send(users)
  })
  //console.log(collection)
  done()
}
module.exports = routes
