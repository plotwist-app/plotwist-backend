import { config } from '@/env'
import { CreateQueueCommand, SQSClient } from '@aws-sdk/client-sqs'

export async function initializeSQS() {
  if (config.app.APP_ENV === 'production') {
    return
  }

  const queues = ['import-movies-queue', 'import-series_queue']

  const sqsClient = createSqsClient()

  for (const queueName of queues) {
    try {
      const command = new CreateQueueCommand({ QueueName: queueName })

      const result = await sqsClient.send(command)
      console.log(`Queue created or exists: ${result.QueueUrl}`)
    } catch (error) {
      console.log(`Failed to create queue ${queueName}:`, error)
      throw error
    }
  }

  console.log('All queues have been created.')
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
