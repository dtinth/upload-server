import { readFileSync } from 'fs'

import { cidOf } from './cidOf.mjs'

console.log(await cidOf(readFileSync('fixtures/hello.html'), 'hello.html'))
