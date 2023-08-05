# upload-server

A simple server that lets me upload file and puts it in an S3-compatible cloud storage with IPFS-compatible path.

## Environment Variables

```
STORAGE_ENDPOINT=
STORAGE_BUCKET=
STORAGE_AK=
STORAGE_SK=
STORAGE_REGION=
STORAGE_PUBLIC_URL=
UPLOAD_KEY=
```

## What it does

This server lets me upload files via `multipart/form-data`:

```sh
curl -X POST "http://localhost:10846/upload?key=$UPLOAD_KEY" -F file=@hello.html
```

The file is saved to an S3-compatible storage, and a URL is returned in JSON format, thus making it compatible with [Uppy](https://uppy.io/)’s [XHR uploader](https://uppy.io/docs/xhr-upload/):

```json
{"url":"https://im.dt.in.th/ipfs/bafybeignkhelrt2ndg57sn7elg5eiaqkdtytrndjsutunlq6ye5unstnla/hello.html"}
```

Note the URL pathname — it is constructed in a way such that if you put the exact same file on the IPFS network, you would get the same content identifier. This means that the same content can also be accessed via any IPFS gateway, given that the file is available on IPFS:

> https://ipfs.io/ipfs/bafybeignkhelrt2ndg57sn7elg5eiaqkdtytrndjsutunlq6ye5unstnla/hello.html
