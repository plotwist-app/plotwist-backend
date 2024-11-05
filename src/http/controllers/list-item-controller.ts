import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createListItemBodySchema,
  getListItemsParamsSchema,
} from '../schemas/list-item'
import { createListItemService } from '@/app/domain/services/list-item/create-list-item'
import { getListItemsService } from '@/app/domain/services/list-item/get-list-items'

export async function createListItemController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = createListItemBodySchema.parse(request.body)
  const result = await createListItemService({ ...body })

  return reply.status(201).send({ listItem: result.listItem })
}

export async function getListItemsController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { listId } = getListItemsParamsSchema.parse(request.params)
  const result = await getListItemsService({ listId })

  return reply.status(201).send({ listItems: result.listItems })
}
