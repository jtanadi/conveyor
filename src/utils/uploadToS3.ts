import { S3 } from "aws-sdk"

import fs from "fs"
import path from "path"
import { promisify } from "util"

const readFile = promisify(fs.readFile)

const s3 = new S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
})

export default (
  cairoDir: string,
  s3Dir: string,
  outFileType: string
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir(cairoDir, async (err, filenames) => {
      if (err) throw err

      const retFiles: string[] = []
      for await (const filename of filenames) {
        if (path.extname(filename).slice(1) === outFileType) {
          const filePath = path.join(cairoDir, filename)

          const Body = await readFile(filePath)
          const params = {
            Bucket: process.env.S3_BUCKET,
            Key: `${s3Dir}/${filename}`,
            Body,
          }

          try {
            const s3data = await s3.putObject(params).promise()
            console.log(s3data)
            retFiles.push(filename)
          } catch (err) {
            reject(err)
          }
        }
      }
      resolve(retFiles.sort())
    })
  })
}
