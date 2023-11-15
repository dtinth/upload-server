import { ipfsify } from './ipfsify.mjs'

export async function cidOf(buffer, name) {
  const { cid } = await ipfsify(buffer, name)
  return cid.toString()
}
