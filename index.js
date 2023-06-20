require('dotenv').config()

const config = require('config')
const fastify = require('fastify')()
let a = config.get('databases')
console.log(a)

fastify.decorate('config', config)

fastify.register(require('@fastify/mongodb'), {
  url: fastify.config.get('databases.mongo')
})

fastify.register(require('./termApplicationForm/index'))

fastify.listen({ port: 3333 }, (err) => {
  if (err) throw err
})
