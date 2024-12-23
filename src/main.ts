// import { createSqsClient, initializeSQS } from './adapters/sqs'
import { startServer } from './http/server'

async function main() {
  // const sqsClient = createSqsClient()
  // await initializeSQS(sqsClient)

  startServer()
}

main().catch(err => {
  console.error('Error initializing Plotwist', err)
})
