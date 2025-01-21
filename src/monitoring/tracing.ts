import { config } from '@/config'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { NodeSDK } from '@opentelemetry/sdk-node'
import {
  BatchSpanProcessor,
  TraceIdRatioBasedSampler,
} from '@opentelemetry/sdk-trace-node'
import { Resource } from '@opentelemetry/resources'
import { diag, DiagLogLevel } from '@opentelemetry/api'
import { DiagConsoleLogger } from '@opentelemetry/api'
import { context, propagation } from '@opentelemetry/api'
import { W3CTraceContextPropagator } from '@opentelemetry/core'
import { AsyncHooksContextManager } from '@opentelemetry/context-async-hooks'

export async function startTracing() {
  propagation.setGlobalPropagator(new W3CTraceContextPropagator())

  const contextManager = new AsyncHooksContextManager()
  context.setGlobalContextManager(contextManager.enable())

  const traceExporter = new OTLPTraceExporter({
    url: config.monitoring.TEMPO_URL,
  })

  const sampler = new TraceIdRatioBasedSampler(1)
  const instrumentations = getNodeAutoInstrumentations({
    '@opentelemetry/instrumentation-fs': { enabled: false },
    '@opentelemetry/instrumentation-fastify': { enabled: true },
    '@opentelemetry/instrumentation-http': { enabled: true },
  })

  const sdk = new NodeSDK({
    resource: new Resource({
      'service.name': 'plotwist-backend',
      'service.version': '1.0.0',
      'deployment.environment': config.app.APP_ENV,
    }),
    sampler,
    spanProcessor: new BatchSpanProcessor(traceExporter),
    instrumentations,
  })

  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG)

  sdk.start()
  console.info('OpenTelemetry tracing started.')

  process.on('SIGTERM', async () => {
    sdk.shutdown()
    console.info('OpenTelemetry tracer has been shut down')
    process.exit(0)
  })
}
