import { initializeSQS } from './adapters/sqs'
import { startServer } from './http/server'

await initializeSQS()

startServer()
