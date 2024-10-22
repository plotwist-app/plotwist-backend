import { client, db } from '.'
import { schema } from './schema'

async function main() {
  console.log('🌱 Database seeded!')
}

main()
  .catch(err => console.error(err))
  .finally(() => client.end())
