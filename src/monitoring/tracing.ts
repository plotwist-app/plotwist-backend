import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { NodeSDK } from '@opentelemetry/sdk-node'
import {
  BatchSpanProcessor,
  TraceIdRatioBasedSampler,
} from '@opentelemetry/sdk-trace-node'

export function startTracing() {
  try {
    const tracer = new NodeSDK({
      sampler: new TraceIdRatioBasedSampler(5),
      spanProcessors: [new BatchSpanProcessor(new OTLPTraceExporter())],
      instrumentations: [
        getNodeAutoInstrumentations({
          '@opentelemetry/instrumentation-fs': { enabled: false },
        }),
      ],
    })

    tracer.start()

    console.info('OTel tracer is running!')
  } catch (err) {
    console.error('Failed to initialize the tracer', err)
  }
}
