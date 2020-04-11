import { Protocol, Response } from "restana"
import path from "path"
import rimraf from "rimraf"

import { ExtendedRequest } from "../types"
import queue from "../utils/queue"

export default (
  req: ExtendedRequest,
  res: Response<Protocol.HTTPS>,
  next: () => void
): void => {
  if (!queue.length) {
    const dirToRemove = path.join(req.locals.cairoDir, "../..")
    rimraf(dirToRemove, (err: Error): void => {
      if (err) throw err
      console.log(`success deleting ${dirToRemove}`)
    })
  }

  next()
}
