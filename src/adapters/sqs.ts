import type { QueueMessage } from '@/domain/entities/queue-message'
import { config } from '@/env'
import type { QueueService } from '@/ports/queue-service'
import {
  CreateQueueCommand,
  ReceiveMessageCommand,
  SendMessageBatchCommand,
  SQSClient,
} from '@aws-sdk/client-sqs'

export async function initializeSQS() {
  if (config.app.APP_ENV === 'production') {
    return
  }

  const queues = [
    config.sqsQueues.importMoviesQueue,
    config.sqsQueues.importSeriesQueue,
  ]

  const sqsClient = createSqsClient()

  for (const queueName of queues) {
    try {
      const command = new CreateQueueCommand({ QueueName: queueName })

      const result = await sqsClient.send(command)
      console.info(`Queue created or exists: ${result.QueueUrl}`)
    } catch (error) {
      console.error(`Failed to create queue ${queueName}:`, error)
      throw error
    }
  }

  console.info('All queues have been created.')
}

export const createSqsClient = () => {
  return new SQSClient({
    region: config.sqs.AWS_REGION,
    endpoint: config.sqs.LOCALSTACK_ENDPOINT || undefined,
    credentials: {
      accessKeyId: config.sqs.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.sqs.AWS_SECRET_ACCESS_KEY,
    },
  })
}

export async function publish({ messages, queueUrl }: QueueMessage) {
  const sqsClient = createSqsClient()
  const MAX_BATCH_SIZE = 10 // SQS LIMIT

  const batches = []
  for (let i = 0; i < messages.length; i += MAX_BATCH_SIZE) {
    const batch = messages
      .slice(i, i + MAX_BATCH_SIZE)
      .map((message, index) => ({
        Id: `${i + index}`,
        MessageBody: JSON.stringify(message),
      }))
    batches.push(batch)
  }

  try {
    for (const batch of batches) {
      const command = new SendMessageBatchCommand({
        QueueUrl: queueUrl,
        Entries: batch,
      })

      const result = await sqsClient.send(command)

      if (result.Successful && result.Successful.length > 0) {
        console.info(
          'Batch sent successfully:',
          result.Successful.map(msg => msg.Id)
        )
      } else {
        console.warn('No successful messages in batch.')
      }

      if (result.Failed && result.Failed.length > 0) {
        console.error('Failed messages:', result.Failed)
      }
    }
  } catch (error) {
    console.error('Error while publishing to SQS:', error)
    throw error
  }
}

async function receiveMessage(sqsClient: SQSClient, queueUrl: string) {
  const params = { QueueUrl: queueUrl, MaxNumberOfMessages: 10 }
  const result = await sqsClient.send(new ReceiveMessageCommand(params))
  return result.Messages?.map(msg => msg.Body)
}

const SqsAdapter: QueueService = {
  publish: queueMessage => publish(queueMessage),
  receiveMessage: queueUrl => receiveMessage(createSqsClient(), queueUrl),
}

export { SqsAdapter }
