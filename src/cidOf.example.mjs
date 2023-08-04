import { readFileSync } from 'fs'

import { cidOf } from './cidOf.mjs'

console.log(
  await cidOf(readFileSync('fixtures/superwhite.m4v'), 'superwhite.m4v'),
)
