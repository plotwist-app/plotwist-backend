import { makeUser } from '@/test/factories/make-user'
import { makeUserItem } from '@/test/factories/make-user-item'
import { describe, expect, it } from 'vitest'

import { getUserItemsService } from './get-user-items'
import { makeReview } from '@/test/factories/make-review'
import { db } from '@/db'
import { schema } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type { UserItem } from '@/domain/entities/user-item'

describe('get user items', () => {
  it('should be able to get user items', async () => {
    const user = await makeUser()
    const userItem = await makeUserItem({ userId: user.id, status: 'WATCHED' })

    const sut = await getUserItemsService({
      status: userItem.status,
      userId: user.id,
      pageSize: 20,
      orderBy: 'updatedAt',
      orderDirection: 'desc',
    })

    expect(sut).toEqual({
      userItems: expect.arrayContaining([
        expect.objectContaining({
          status: userItem.status,
        }),
      ]),
      nextCursor: null,
    })
  })

  it('should be able to get user items with cursor', async () => {
    const user = await makeUser()

    const userItems = await Promise.all(
      Array.from({ length: 25 }, () =>
        makeUserItem({ userId: user.id, status: 'WATCHED' })
      )
    )

    const sortedItems = userItems.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )

    const middleItem = sortedItems[10]

    const sut = await getUserItemsService({
      status: middleItem.status,
      userId: user.id,
      pageSize: 20,
      orderBy: 'updatedAt',
      orderDirection: 'desc',
      cursor: new Date(middleItem.updatedAt).toISOString(),
    })

    expect(sut.userItems.length).toBeGreaterThan(0)
    expect(sut.userItems.length).toBeLessThanOrEqual(20)
    expect(sut.nextCursor).toBeDefined()

    const timestamps = sut.userItems.map(item =>
      new Date(item.updatedAt).getTime()
    )
    expect(timestamps).toEqual([...timestamps].sort((a, b) => b - a))
  })

  it('should be able to filter by rating', async () => {
    const user = await makeUser()
    const userItem = await makeUserItem({ userId: user.id, status: 'WATCHED' })

    const itemsBeforeReview = await getUserItemsService({
      status: userItem.status,
      userId: user.id,
      pageSize: 20,
      orderBy: 'updatedAt',
      orderDirection: 'desc',
      rating: 5,
    })

    expect(itemsBeforeReview.userItems).toHaveLength(0)

    await makeReview({
      userId: user.id,
      review: 'This is a test review',
      tmdbId: userItem.tmdbId,
      mediaType: userItem.mediaType,
      rating: 5,
    })

    const sut = await getUserItemsService({
      status: userItem.status,
      userId: user.id,
      pageSize: 20,
      orderBy: 'updatedAt',
      orderDirection: 'desc',
      rating: 5,
    })

    expect(sut.userItems).toHaveLength(1)
  })

  it('should be able to filter by status', async () => {
    const user = await makeUser()
    const userItem = await makeUserItem({ userId: user.id, status: 'WATCHED' })

    const wrongStatus = await getUserItemsService({
      status: 'WATCHLIST',
      userId: user.id,
      pageSize: 20,
      orderBy: 'updatedAt',
      orderDirection: 'desc',
    })

    expect(wrongStatus.userItems).toHaveLength(0)

    const sut = await getUserItemsService({
      status: userItem.status,
      userId: user.id,
      pageSize: 20,
      orderBy: 'updatedAt',
      orderDirection: 'desc',
    })

    expect(sut.userItems).toHaveLength(1)
  })

  it('should be able to filter by media type', async () => {
    const user = await makeUser()
    const userItem = await makeUserItem({
      userId: user.id,
      status: 'WATCHED',
      mediaType: 'MOVIE',
    })

    const wrongMediaType = await getUserItemsService({
      status: userItem.status,
      userId: user.id,
      pageSize: 20,
      orderBy: 'updatedAt',
      orderDirection: 'desc',
      mediaType: 'TV_SHOW',
    })

    expect(wrongMediaType.userItems).toHaveLength(0)

    const sut = await getUserItemsService({
      status: userItem.status,
      userId: user.id,
      pageSize: 20,
      orderBy: 'updatedAt',
      orderDirection: 'desc',
      mediaType: userItem.mediaType,
    })

    expect(sut.userItems).toHaveLength(1)
  })

  for (const field of ['addedAt', 'updatedAt']) {
    it(`should be able to order ${field} descending`, async () => {
      const user = await makeUser()
      const oldItem = await makeUserItem({ userId: user.id, status: 'WATCHED' })

      const earlierItem = await makeUserItem({
        userId: user.id,
        status: 'WATCHED',
        mediaType: 'TV_SHOW',
      })

      const earlierDate = new Date(new Date(oldItem.addedAt).getTime() - 1000)

      await updateUserItem(earlierItem, {
        addedAt: earlierDate,
        updatedAt: earlierDate,
      })

      await updateUserItem(oldItem, {
        addedAt: new Date(new Date(oldItem.addedAt).getTime() - 100000),
        updatedAt: new Date(new Date(oldItem.updatedAt).getTime() - 100000),
      })

      const sut = await getUserItemsService({
        status: 'WATCHED',
        userId: user.id,
        pageSize: 20,
        orderBy: 'addedAt',
        orderDirection: 'desc',
      })

      expect(sut.userItems).toEqual([
        expect.objectContaining({ id: earlierItem.id }),
        expect.objectContaining({ id: oldItem.id }),
      ])
    })
  }

  for (const field of ['addedAt', 'updatedAt']) {
    it(`should be able to order ${field} ascending`, async () => {
      const user = await makeUser()
      const oldItem = await makeUserItem({ userId: user.id, status: 'WATCHED' })

      const earlierItem = await makeUserItem({
        userId: user.id,
        status: 'WATCHED',
        mediaType: 'TV_SHOW',
      })

      const earlierDate = new Date(new Date(oldItem.addedAt).getTime() - 1000)

      await updateUserItem(earlierItem, {
        addedAt: earlierDate,
        updatedAt: earlierDate,
      })

      await updateUserItem(oldItem, {
        addedAt: new Date(new Date(oldItem.addedAt).getTime() - 100000),
        updatedAt: new Date(new Date(oldItem.updatedAt).getTime() - 100000),
      })

      const sut = await getUserItemsService({
        status: 'WATCHED',
        userId: user.id,
        pageSize: 20,
        orderBy: 'updatedAt',
        orderDirection: 'asc',
      })

      expect(sut.userItems).toEqual([
        expect.objectContaining({ id: oldItem.id }),
        expect.objectContaining({ id: earlierItem.id }),
      ])
    })
  }

  it('should be able to order by rating descending', async () => {
    const user = await makeUser()
    const userItem = await makeUserItem({ userId: user.id, status: 'WATCHED' })

    await makeReview({
      userId: user.id,
      tmdbId: userItem.tmdbId,
      mediaType: userItem.mediaType,
      rating: 5,
    })

    const lowerItem = await makeUserItem({
      userId: user.id,
      status: 'WATCHED',
    })

    await makeReview({
      userId: user.id,
      tmdbId: lowerItem.tmdbId,
      mediaType: lowerItem.mediaType,
      rating: 4,
    })

    const sut = await getUserItemsService({
      status: 'WATCHED',
      userId: user.id,
      pageSize: 20,
      orderBy: 'rating',
      orderDirection: 'desc',
    })

    expect(sut.userItems).toEqual([
      expect.objectContaining({ id: userItem.id }),
      expect.objectContaining({ id: lowerItem.id }),
    ])
  })

  it('should be able to order by rating ascending', async () => {
    const user = await makeUser()
    const userItem = await makeUserItem({ userId: user.id, status: 'WATCHED' })

    await makeReview({
      userId: user.id,
      tmdbId: userItem.tmdbId,
      mediaType: userItem.mediaType,
      rating: 5,
    })

    const lowerItem = await makeUserItem({
      userId: user.id,
      status: 'WATCHED',
    })

    await makeReview({
      userId: user.id,
      tmdbId: lowerItem.tmdbId,
      mediaType: lowerItem.mediaType,
      rating: 4,
    })

    const sut = await getUserItemsService({
      status: 'WATCHED',
      userId: user.id,
      pageSize: 20,
      orderBy: 'rating',
      orderDirection: 'asc',
    })

    expect(sut.userItems).toEqual([
      expect.objectContaining({ id: lowerItem.id }),
      expect.objectContaining({ id: userItem.id }),
    ])
  })
})

type UpdateUserItemParams = {
  addedAt?: Date
  updatedAt?: Date
}

async function updateUserItem(
  userItem: UserItem,
  params: UpdateUserItemParams
) {
  await db
    .update(schema.userItems)
    .set(params)
    .where(eq(schema.userItems.id, userItem.id))
}
