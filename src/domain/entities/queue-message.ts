export type QueueMessage = {
  queueUrl: string
  idempotencyKey: string
  messages: object[]
}
