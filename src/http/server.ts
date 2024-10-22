import cors from '@fastify/cors'
import fastify from 'fastify'

import { env } from '../env'
import { registerUserRoute } from './routes/register-user'

const app = fastify()

app.register(cors, {
  origin: '*',
})

app.register(registerUserRoute)

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP server running!')
  })
