import rimraf from "rimraf"

export default (dirToRemove: string): void => {
  rimraf(dirToRemove, (err: Error): void => {
    if (err) throw err
    console.log(`success deleting ${dirToRemove}`)
  })
}
