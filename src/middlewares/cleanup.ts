import { Protocol, Response } from "restana"
import { ExtendedRequest } from "../types"
import path from "path"
import rimraf from "rimraf"

export default (
  req: ExtendedRequest,
  res: Response<Protocol.HTTPS>,
  next: () => void
) => {
  const dirToRemove = path.join(req.locals.cairoDir, "../..")
  rimraf(dirToRemove, (err: Error): void => {
    if (err) throw err
    console.log(`success deleting ${dirToRemove}`)
  })

  // Go to next middleware regardless so we
  // can respond to client as soon as possible
  next()
}
