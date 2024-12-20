import { initializeSQS } from './adapters/sqs'
import { startServer } from './http/server'

async function main() {
  await initializeSQS()

  startServer()
}

main().catch(err => {
  console.error('Error initializing Plotwist', err)
})
