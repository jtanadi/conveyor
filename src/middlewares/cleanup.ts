import { Request, Response, NextFunction } from "express"
import path from "path"
import rimraf from "rimraf"

export default (req: Request, res: Response, next: NextFunction) => {
  const dirToRemove = path.join(req.locals.cairoDir, "../..")
  rimraf(dirToRemove, (err: Error): void => {
    if (err) throw err
    console.log(`success deleting ${dirToRemove}`)
  })

  // Go to next middleware regardless so we
  // can respond to client as soon as possible
  next()
}
