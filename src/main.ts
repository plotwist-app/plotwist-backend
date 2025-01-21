import { startServer } from './http/server'
import { startMonitoring } from './monitoring/monitoring'
import { startWorkers } from './workers/worker'

async function main() {
  startWorkers()
  startServer()
  await startMonitoring()
}

main().catch(err => {
  console.error('Error initializing Plotwist', err)
})
