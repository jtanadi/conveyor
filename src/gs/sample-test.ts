import fs from "fs"
import path from "path"

import gs from "./"

const containingDir = "../../sample-pdfs/"
const filename = "large-drawing.pdf"
const ext = path.extname(filename)
const outputDir = path.join("output", path.basename(filename, ext))

if (fs.existsSync(path.join(containingDir, outputDir))) {
  fs.rmdirSync(path.join(containingDir, outputDir))
}

fs.mkdirSync(path.join(containingDir, outputDir))

gs.convert(
  path.join(containingDir, filename),
  path.join(containingDir, outputDir, path.basename(filename, ext)),
  "png",
  72
)
