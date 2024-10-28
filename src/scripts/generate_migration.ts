import { parseArgs } from 'node:util'
import { $ } from 'bun'
import { exitCode } from 'node:process'
import { log } from 'node:console'

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    name: {
      type: 'string',
    },
  },
  strict: true,
  allowPositionals: true,
})

if (!values.name) {
  console.error('Please provide a name for the migration.')
} else {
  await $`bunx --env-file=../../.env -- drizzle-kit generate --name=${values.name}`
}
