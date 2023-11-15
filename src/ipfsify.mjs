import { Readable } from 'stream'
import { createHelia } from 'helia'
import { unixfs } from '@helia/unixfs'
import { car } from '@helia/car'
import { CarWriter } from '@ipld/car'

export async function ipfsify(buffer, name) {
  const helia = await createHelia({ start: false })
  const fs = unixfs(helia)
  const cid = await fs.cp(
    await fs.addBytes(buffer),
    await fs.addDirectory(),
    name,
  )
  const c = car(helia)
  const { writer, out } = await CarWriter.create(cid)
  const carPromise = Readable.from(out).toArray()
  await c.export(cid, writer)
  const carBuffer = Buffer.concat(await carPromise)
  return {
    /** The content identifier that can be used to retrieve the content from IPFS */
    cid,

    /** The content in the form of a CAR file */
    carBuffer,
  }
}
