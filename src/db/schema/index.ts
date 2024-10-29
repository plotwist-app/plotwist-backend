import { randomUUID } from 'node:crypto'
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'

export const followers = pgTable('followers', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  followerId: uuid('follower_id').notNull(),
  followedId: uuid('followed_id').notNull(),
  createdAt: timestamp('createdAt').notNull(),
})

export const users = pgTable('users', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  username: text('name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const schema = {
  users,
}
