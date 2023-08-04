import Fastify from 'fastify'
import multipart from '@fastify/multipart'
import cors from '@fastify/cors'
import { createHash } from 'crypto'
import { cidOf } from './cidOf.mjs'
import * as Minio from 'minio'
import mime from 'mime'

const minioClient = new Minio.Client({
  endPoint: process.env.STORAGE_ENDPOINT,
  useSSL: true,
  accessKey: process.env.STORAGE_AK,
  secretKey: process.env.STORAGE_SK,
  region: process.env.STORAGE_REGION,
})

const fastify = Fastify({ logger: true })
fastify.register(cors)
fastify.register(multipart, {
  limits: {
    fileSize: 32 * 1024 * 1024,
  },
})

fastify.post('/upload', async function (req, reply) {
  if (req.query.key !== process.env.UPLOAD_KEY) {
    reply.status(403)
    return { error: 'invalid key' }
  }
  const data = await req.file()
  const buffer = await data.toBuffer()
  const sha = createHash('sha1').update(buffer).digest('hex')
  const filename =
    req.query.name === 'hash'
      ? `${sha}.${data.filename.split('.').pop()}`
      : data.filename
  const cid = await cidOf(buffer, filename)
  const key = `ipfs/${cid}/${filename}`
  await minioClient.putObject(String(process.env.STORAGE_BUCKET), key, buffer, {
    'Content-Type': mime.getType(filename),
  })
  const url = process.env.STORAGE_PUBLIC_URL + '/' + key
  return { url }
})

fastify.listen({ port: +process.env.PORT || 10846, host: '0.0.0.0' }, (err) => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
