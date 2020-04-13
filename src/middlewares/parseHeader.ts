import { Protocol, Response } from "restana"

import { ExtendedRequest } from "../types"

export default (
  req: ExtendedRequest,
  res: Response<Protocol.HTTPS>,
  next: () => void
): void => {
  if (req.headers["content-type"] !== "application/pdf") {
    throw new Error("Invalid content-type. Only application/pdf is supported.")
  }

  console.log("Request OK: valid content-type")

  if (!req.headers["x-pingback"]) {
    throw new Error("Pingback required")
  }

  const pingback = req.headers["x-pingback"]
  req.pingback = Array.isArray(pingback) ? pingback[0] : pingback
  console.log(`Request OK: pingback ${req.pingback} provided`)

  const forwardData = req.headers["x-forward-data"]
  req.forwardData = Array.isArray(forwardData) ? forwardData[0] : forwardData

  console.log(req.forwardData)

  next()
}
