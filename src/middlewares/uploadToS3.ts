import { Protocol, Response } from "restana"
import fs from "fs"
import path from "path"
import { promisify } from "util"

import { ExtendedRequest } from "../types"
import s3 from "../utils/s3"
import queue from "../utils/queue"

const readFile = promisify(fs.readFile)

export default (
  req: ExtendedRequest,
  res: Response<Protocol.HTTPS>,
  next: () => void
): void => {
  const { cairoDir, s3Dir } = req.locals
  fs.readdir(cairoDir, async (err, filenames) => {
    if (err) throw err

    const pages = []
    for await (const filename of filenames) {
      if (path.extname(filename).slice(1) === req.outFileType) {
        const filePath = path.join(cairoDir, filename)

        const Body = await readFile(filePath)
        const params = {
          Bucket: process.env.S3_BUCKET,
          Key: `${s3Dir}/${filename}`,
          Body,
        }

        console.log(`uploading ${filename}`)

        /* eslint-disable no-useless-catch */
        try {
          const s3data = await s3.putObject(params).promise()
          console.log(s3data)
          pages.push(filename)
        } catch (err) {
          throw err
        }
      }
    }
    req.locals.pages = pages
    queue.shift()
    next()
  })
}
