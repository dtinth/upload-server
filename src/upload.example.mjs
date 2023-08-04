import * as Minio from 'minio'

const minioClient = new Minio.Client({
  endPoint: process.env.STORAGE_ENDPOINT,
  useSSL: true,
  accessKey: process.env.STORAGE_AK,
  secretKey: process.env.STORAGE_SK,
  region: 'auto',
})

minioClient.traceOn()

await minioClient.putObject(
  String(process.env.STORAGE_BUCKET),
  'hello.txt',
  Buffer.from('hello world'),
  { 'Content-Type': 'text/plain' },
)
