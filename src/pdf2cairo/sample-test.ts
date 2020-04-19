import fs from "fs"
import path from "path"
import rimraf from "rimraf"

import pdf2cairo from "./"

const containingDir = "../../sample-pdfs/"
const filename = "large-drawing.pdf"
const ext = path.extname(filename)
const outputDir = path.join(
  containingDir,
  "output",
  path.basename(filename, ext)
)

if (fs.existsSync(outputDir)) {
  rimraf.sync(outputDir)
}

fs.mkdirSync(outputDir)

const start = Date.now()
pdf2cairo
  .convert(
    path.join(containingDir, filename),
    path.join(outputDir, path.basename(filename, ext)),
    "png",
    72
  )
  .then(() => {
    console.log(`pdftocairo took ${Date.now() - start}ms`)
  })
