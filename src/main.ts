import { startServer } from './http/server'
import { initializeSQS } from './sqs'

await initializeSQS()

startServer()
