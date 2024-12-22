import { SqsAdapter } from '@/adapters/sqs'

export async function consumeMessages(
  queueUrl: string,
  processMessage: (message: string) => Promise<void>
) {
  while (true) {
    try {
      const messages = await SqsAdapter.receiveMessage(queueUrl)

      if (messages && messages.length > 0) {
        for (const message of messages) {
          if (typeof message === 'string') {
            try {
              await processMessage(message)
            } catch (error) {
              console.error(`Error processing message: ${message}`, error)
            }
          } else {
            console.warn('Received message is not a string:', message)
          }
        }
      }
      await delay(2000)
    } catch (error) {
      console.error(`Error consuming messages from queue: ${queueUrl}`, error)
    }
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
