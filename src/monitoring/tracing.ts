import { config } from '@/config'
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { NodeSDK } from '@opentelemetry/sdk-node'
import {
  BatchSpanProcessor,
  TraceIdRatioBasedSampler,
} from '@opentelemetry/sdk-trace-node'
import { Resource } from '@opentelemetry/resources'

export async function startTracing() {
  try {
    const traceExporter = new OTLPTraceExporter({
      url: `${config.monitoring.JAEGER_URL}`,
      headers: {},
    })

    const resource = new Resource({
      'service.name': 'plotwist-backend',
      'service.version': '1.0.0',
      'deployment.environment': config.app.APP_ENV,
    })

    const tracer = new NodeSDK({
      resource,
      sampler: new TraceIdRatioBasedSampler(5),
      spanProcessors: [new BatchSpanProcessor(traceExporter)],
      instrumentations: [
        getNodeAutoInstrumentations({
          '@opentelemetry/instrumentation-fs': { enabled: false },
          '@opentelemetry/instrumentation-http': { enabled: false },
          '@opentelemetry/instrumentation-fastify': { enabled: true },
        }),
      ],
    })

    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG)

    tracer.start()

    console.info('OTel tracer is running!')
  } catch (err) {
    console.error('Failed to initialize the tracer', err)
  }
}
