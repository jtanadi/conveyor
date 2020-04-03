import fs from "fs"
import path from "path"

import pdf2cairo from "./"

const containingDir = "../../sample-pdfs/"
const filename = "sample.pdf"
const ext = path.extname(filename)
const outputDir = path.join("output", path.basename(filename, ext))

if (fs.existsSync(path.join(containingDir, outputDir))) {
  fs.rmdirSync(path.join(containingDir, outputDir))
}

fs.mkdirSync(path.join(containingDir, outputDir))

pdf2cairo.convert(
  path.join(containingDir, filename),
  path.join(containingDir, outputDir, path.basename(filename, ext)),
  "png"
)
