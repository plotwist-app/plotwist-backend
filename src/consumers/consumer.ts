import { SqsAdapter } from '@/adapters/sqs'

export async function consumeMessages(
  queueUrl: string,
  processMessage: (message: string) => Promise<void>
) {
  if (!queueUrl) {
    throw new Error('Queue URL must be a valid string')
  }

  while (true) {
    try {
      const messages = await SqsAdapter.receiveMessage(queueUrl)
      if (messages) {
        await processMessages(
          messages.filter((msg): msg is string => typeof msg === 'string'),
          processMessage
        )
      }
      await delay(2000)
    } catch (error) {
      console.error(`Error consuming messages from queue: ${queueUrl}`, error)
    }
  }
}

async function processMessages(
  messages: string[],
  processMessage: (message: string) => Promise<void>
): Promise<void> {
  if (messages.length === 0) return

  for (const message of messages) {
    try {
      await processMessage(message)
    } catch (error) {
      console.error(`Error processing message: ${message}`, error)
    }
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
