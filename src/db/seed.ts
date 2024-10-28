import { client } from '.'

async function main() {
  console.log('🌱 Database seeded!')
}

main()
  .catch(err => console.error(err))
  .finally(() => client.end())
