import { listItems, schema } from '@/db/schema'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const createListItemBodySchema = createInsertSchema(
  schema.listItems
).omit({ id: true, createdAt: true })

export const createListItemResponseSchema = {
  201: z.object({
    listItem: createSelectSchema(schema.listItems),
  }),
}

export const getListItemsParamsSchema = z.object({
  listId: z.string().uuid(),
})

export const getListItemsResponseSchema = {
  200: z.object({
    listItems: createSelectSchema(schema.listItems),
  }),
}
