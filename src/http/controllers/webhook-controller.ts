import { checkoutSessionCompleted } from '@/domain/services/checkout/checkout-session-completed'

import { env } from '@/env'
import { stripe } from '@/services/stripe'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type Stripe from 'stripe'

export async function webhookController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const stripeSignature = request.headers['stripe-signature']
  if (!stripeSignature) {
    return reply.status(400).send('Missing Stripe signature.')
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      request.body as string,
      stripeSignature,
      env.STRIPE_SECRET_KEY
    )
  } catch (error) {
    return reply.status(400).send(`Webhook Error: ${error}`)
  }

  switch (event.type) {
    case 'checkout.session.completed':
      await checkoutSessionCompleted(event.data.object.customer_email)
      break

    case 'invoice.payment_succeeded':
      break

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return reply.status(200).send({ received: true })
}
