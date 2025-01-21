import { startTracing } from './monitoring/tracing'
import { startServer } from './http/server'
import { startWorkers } from './workers/worker'

async function main() {
  await startTracing()
  await startWorkers()
  await startServer()
}

main().catch(err => {
  console.error('Error initializing Plotwist', err)
})
