import { Request, Response, NextFunction } from "express"
import fs from "fs"
import path from "path"
import pdf2cairo from "../pdf2cairo"
import { nanoid } from "nanoid"

export default (req: Request, res: Response, next: NextFunction) => {
  const filename = nanoid()
  const tempDir = path.join(__dirname, "../../tmp/")
  const cairoOutputDir = path.join(tempDir, "cairo", filename)

  /* if (!fs.existsSync(tempDir)) { */
  /*   fs.mkdirSync(tempDir) */
  /* } */

  if (!fs.existsSync(cairoOutputDir)) {
    fs.mkdirSync(cairoOutputDir, { recursive: true })
  }

  const saveToPath = path.join(tempDir, `${filename}.pdf`)
  req.pipe(fs.createWriteStream(saveToPath))

  req.on("end", async () => {
    req.locals = {
      cairoDir: cairoOutputDir,
      s3Dir: filename,
    }

    await pdf2cairo.convert(
      saveToPath,
      path.join(cairoOutputDir, "page"),
      "png"
    )

    next()
  })

  req.on("error", (e: Error) => {
    throw e
  })
}
