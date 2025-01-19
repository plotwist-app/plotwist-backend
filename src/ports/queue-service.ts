import type { QueueMessage } from '@/domain/entities/queue-message'

export interface QueueService {
  initialize(): Promise<void>
  publish(queueMessage: QueueMessage): Promise<void>
  receiveMessage(queueUrl: string): Promise<(string | undefined)[] | undefined>
}
