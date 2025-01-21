// import { propagation, trace } from '@opentelemetry/api'
// import { context } from '@opentelemetry/api'
// import type { FastifyInstance } from 'fastify'

// export function spanMiddleware(app: FastifyInstance) {
//   app.addHook('onRequest', async (request, reply) => {
//     const tracer = trace.getTracer('default')
//     const parentContext = propagation.extract(context.active(), request.headers)

//     // Inicia o span
//     const span = tracer.startSpan(
//       'http.middleware',
//       {
//         kind: 1,
//         attributes: {
//           'http.method': request.method,
//           'http.url': request.url,
//           'net.peer.ip': request.ip,
//         },
//       },
//       parentContext
//     )

//     console.log('Span attributes onRequest:', {
//       'http.method': request.method,
//       'http.url': request.url,
//       'net.peer.ip': request.ip,
//     })

//     request.span = span
//   })

//   app.addHook('onResponse', async (request, reply) => {
//     if (request.span) {
//       request.span.setAttribute('http.status_code', reply.statusCode)
//       request.span.setAttribute('http.route', request.url)
//       request.span.setAttribute('http.method', request.method)

//       request.span.end()
//     }
//   })
// }
