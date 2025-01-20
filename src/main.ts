import { startServer } from './http/server'
import { startMonitoring } from './monitoring/monitoring'
import { startWorkers } from './workers/worker'

async function main() {
  startWorkers()
  startServer()
  startMonitoring()
}

main().catch(err => {
  console.error('Error initializing Plotwist', err)
})
