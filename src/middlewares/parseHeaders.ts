import { Protocol, Response } from "restana"

import { ExtendedRequest } from "../types"
import postPingback from "../utils/postPingback"

export default (
  req: ExtendedRequest,
  res: Response<Protocol.HTTPS>,
  next: () => void
): void => {
  if (!req.headers["x-pingback"]) {
    throw new Error("Pingback required")
  }

  console.log("Request OK: valid content-type")

  const pingback = req.headers["x-pingback"]
  req.pingback = Array.isArray(pingback) ? pingback[0] : pingback
  console.log(`Request OK: pingback ${req.pingback} provided`)

  if (req.headers["content-type"] !== "application/pdf") {
    postPingback(req.pingback, {
      status: "error",
      message: "Invalid content-type. Only application/pdf is supported.",
    })

    throw new Error("Invalid content-type. Only application/pdf is supported.")
  }

  const forwardData = req.headers["x-forward-data"]
  req.forwardData = Array.isArray(forwardData) ? forwardData[0] : forwardData

  postPingback(req.pingback, {
    status: "processing",
    message: "Request received by conveyor",
  })

  next()
}
