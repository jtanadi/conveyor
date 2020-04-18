import fs from "fs"
import path from "path"
import rimraf from "rimraf"

import gs from "./"

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

/* gs.convert( */
/*   path.join(containingDir, filename), */
/*   path.join(outputDir, path.basename(filename, ext)), */
/*   "png", */
/*   150 */
/* ).then(() => { */
/*   console.log(`gs took ${Date.now() - start}ms`) */
/* }) */

const resolutions = []
for (let i = 0; i < 14; i++) {
  resolutions[i] = 150
}

Promise.all(
  resolutions.map((res, i) => {
    console.log(`Outputting page ${i + 1} at ${res}`)
    return gs.convert(
      path.join(containingDir, filename),
      path.join(outputDir, path.basename(filename, ext)),
      "png",
      res,
      i + 1
    )
  })
).then(() => {
  console.log(`gs took ${Date.now() - start}ms`)
})
