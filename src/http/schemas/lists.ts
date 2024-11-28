import { schema } from '@/db/schema'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const createListBodySchema = createInsertSchema(schema.lists).omit({
  id: true,
  userId: true,
  createdAt: true,
  bannerPath: true,
})

export const createListResponseSchema = {
  201: z
    .object({
      list: createSelectSchema(schema.lists),
    })
    .describe('List created.'),
  404: z
    .object({
      message: z.string(),
    })
    .describe('User not found'),
}

export const getListsQuerySchema = z.object({
  userId: z.string().optional(),
  limit: z.coerce.number().default(5).optional(),
})

export const getListsResponseSchema = {
  200: z.object({
    lists: z.array(
      createSelectSchema(schema.lists).extend({
        likeCount: z.number(),
        hasLiked: z.boolean(),
        items: z.array(
          createSelectSchema(schema.listItems).pick({
            id: true,
            mediaType: true,
            tmdbId: true,
          })
        ),
        user: createSelectSchema(schema.users).pick({
          id: true,
          username: true,
          imagePath: true,
        }),
      })
    ),
  }),
  404: z.object({
    message: z.string(),
  }),
}

export const deleteListParamsSchema = z.object({
  id: z.string().uuid(),
})

export const deleteListResponseSchema = {
  204: z.null(),
  404: z.object({ message: z.string() }).describe('List not found.'),
}

export const updateListParamsSchema = z.object({
  id: z.string().uuid(),
})

export const updateListBodySchema = createInsertSchema(schema.lists).omit({
  userId: true,
  id: true,
  createdAt: true,
  bannerPath: true,
})

export const updateListResponseSchema = {
  200: z.object({
    list: createSelectSchema(schema.lists),
  }),
  404: z.object({ message: z.string() }).describe('List not found.'),
}

export const getListParamsSchema = z.object({
  id: z.string().uuid(),
})

export const getListResponseSchema = {
  200: z.object({
    list: createSelectSchema(schema.lists).extend({
      likeCount: z.number(),
      userLike: z
        .object({
          id: z.string(),
          entityId: z.string(),
          userId: z.string(),
          createdAt: z.string(),
        })
        .nullable(),
    }),
  }),
  404: z.object({ message: z.string() }).describe('List not found.'),
}

export const updateListBannerBodySchema = z.object({
  bannerPath: z.string(),
  listId: z.string(),
})

export const updateListBannerResponseSchema = {
  200: z.object({
    list: createSelectSchema(schema.lists),
  }),
}
