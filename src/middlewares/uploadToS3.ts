import { Protocol, Response } from "restana"
import { ExtendedRequest } from "../types"
import fs from "fs"
import path from "path"
import s3 from "../utils/s3"
import { promisify } from "util"

const readFile = promisify(fs.readFile)

export default (
  req: ExtendedRequest,
  res: Response<Protocol.HTTPS>,
  next: () => void
) => {
  const { cairoDir, s3Dir } = req.locals
  fs.readdir(cairoDir, async (err, filenames) => {
    if (err) throw err

    const pages = []
    for await (const filename of filenames) {
      if (path.extname(filename) === ".png") {
        const filePath = path.join(cairoDir, filename)

        try {
          const Body = await readFile(filePath)
          const params = {
            Bucket: process.env.S3_BUCKET,
            Key: `${s3Dir}/${filename}`,
            Body,
          }

          const s3data = await s3.putObject(params).promise()
          console.log(s3data)
          pages.push(filename)
        } catch (err) {
          throw err
        }
      }
    }
    req.locals.pages = pages
    next()
  })
}
