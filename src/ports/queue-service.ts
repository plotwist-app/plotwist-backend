export interface QueueService {
  createQueue(queueName: string): Promise<string | undefined>
  sendMessage(queueUrl: string, message: string): Promise<string | undefined>
  receiveMessage(queueUrl: string): Promise<(string | undefined)[] | undefined>
}
