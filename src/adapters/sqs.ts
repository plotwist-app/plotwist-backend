import type { QueueService } from '@/ports/queue-service'
import { createSqsClient } from '@/sqs'
import {
  CreateQueueCommand,
  ReceiveMessageCommand,
  SendMessageCommand,
  type SQSClient,
} from '@aws-sdk/client-sqs'

async function createQueue(sqsClient: SQSClient, queueName: string) {
  const params = { QueueName: queueName }
  const result = await sqsClient.send(new CreateQueueCommand(params))
  return result.QueueUrl
}

async function sendMessage(
  sqsClient: SQSClient,
  queueUrl: string,
  message: string
) {
  const params = { QueueUrl: queueUrl, MessageBody: message }
  const result = await sqsClient.send(new SendMessageCommand(params))
  return result.MessageId
}

async function receiveMessage(sqsClient: SQSClient, queueUrl: string) {
  const params = { QueueUrl: queueUrl, MaxNumberOfMessages: 10 }
  const result = await sqsClient.send(new ReceiveMessageCommand(params))
  return result.Messages?.map(msg => msg.Body)
}

const SqsAdapter: QueueService = {
  createQueue: queueName => createQueue(createSqsClient(), queueName),
  sendMessage: (queueUrl, message) =>
    sendMessage(createSqsClient(), queueUrl, message),
  receiveMessage: queueUrl => receiveMessage(createSqsClient(), queueUrl),
}

export { SqsAdapter }
