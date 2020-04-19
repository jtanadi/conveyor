import fs from "fs"
import rimraf from "rimraf"

export default (fileToRemove: string, dirToRemove: string): void => {
  fs.unlink(fileToRemove, (err: Error): void => {
    if (err) throw err
    console.log(`success deleting ${fileToRemove}`)
  })

  rimraf(dirToRemove, (err: Error): void => {
    if (err) throw err
    console.log(`success deleting ${dirToRemove}`)
  })
}
