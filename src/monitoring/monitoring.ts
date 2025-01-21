import { startTracing } from './tracing'

async function startMonitoring() {
  await startTracing()
  // startMetrics()
}

export { startMonitoring }
