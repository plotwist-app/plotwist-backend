import { config } from '@/config'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
// import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http'
import { Resource } from '@opentelemetry/resources'
import { NodeSDK } from '@opentelemetry/sdk-node'
import {
  BatchSpanProcessor,
  TraceIdRatioBasedSampler,
} from '@opentelemetry/sdk-trace-node'
// import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics'

import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api'

// Enable OpenTelemetry debug logging
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG)

try {
  const resource = new Resource({
    'service.name': 'plotwist-backend',
    'service.version': '1.0.0',
    'deployment.environment': config.app.APP_ENV,
  })

  const traceExporter = new OTLPTraceExporter({
    url: config.monitoring.GRAFANA_CLOUD_TRACES_URL,
    headers: {
      Authorization: `Basic ${Buffer.from(config.monitoring.GRAFANA_CLOUD_API_KEY).toString('base64')}`,
    },
  })

  // const metricExporter = new OTLPMetricExporter({
  //   url: config.monitoring.GRAFANA_CLOUD_METRICS_URL,
  //   headers: {
  //     Authorization: `Basic ${Buffer.from(config.monitoring.GRAFANA_CLOUD_API_KEY).toString('base64')}`,
  //   },
  // })

  // const metricReader = new PeriodicExportingMetricReader({
  //   exporter: metricExporter,
  //   exportIntervalMillis: 1000,
  // })

  const sdk = new NodeSDK({
    resource,
    sampler: new TraceIdRatioBasedSampler(1.0),
    spanProcessor: new BatchSpanProcessor(traceExporter),
    // metricReader,
    instrumentations: [
      getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-fs': { enabled: false },
        '@opentelemetry/instrumentation-http': { enabled: true },
        '@opentelemetry/instrumentation-fastify': { enabled: true },
      }),
    ],
  })

  sdk.start()

  console.info('OTel tracer is running!')
} catch (err) {
  console.error('Failed to initialize the tracer', err)
}
