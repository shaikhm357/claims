
async function routes(fastify, optons, done) {
  //validation schema

  const item = {
    type: 'object',
    properties: {
      _id: { type: 'string' },
      name: { type: 'string' }
    }
  }

  fastify.get('/', async (req, reply) => {
    reply.send({ hello: 'world' })
  })

  fastify.get('/getClaimSchema', async (req, reply) => {
    // This collection comes from "mongodb://mongo1/mydb"
    const db = fastify.mongo.db

    // Access a collection
    const collection = db.collection('counters')

    // Perform database operations
    const users = await collection.find().toArray()

    reply.send(users)
  })
  //console.log(collection)
  done()

}
module.exports = routes
