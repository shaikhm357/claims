require('dotenv').config()

const config = require('config')
const fastify = require('fastify')()
let a = config.get('databases')
console.log(a)

fastify.decorate('config', config)

fastify.register(require('@fastify/mongodb'), {
  url: fastify.config.get('databases.mongo')
})

fastify.get('/', async (req, reply) => {
  // This collection comes from "mongodb://mongo1/mydb"
  const db = fastify.mongo.db

  // Access a collection
  const collection = db.collection('counters')

  // Perform database operations
  const users = await collection.find().toArray()

  reply.send(users)

})

fastify.listen({ port: 3333 }, (err) => {
  if (err) throw err
})
