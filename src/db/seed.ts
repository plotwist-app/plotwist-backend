import { client, db } from '.'
import { schema } from './schema'

async function main() {
  await db.delete(schema.users)

  await db.insert(schema.users).values({
    name: 'Victor Nogueira',
    email: 'caraquecoda@example.com',
  })

  console.log('🌱 Database seeded!')
}

main()
  .catch(err => console.error(err))
  .finally(() => client.end())
