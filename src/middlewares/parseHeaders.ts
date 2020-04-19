import { Protocol, Response } from "restana"

import { ExtendedRequest } from "../types"
import postPingback from "../utils/postPingback"

export default (
  req: ExtendedRequest,
  res: Response<Protocol.HTTPS>,
  next: () => void
): void => {
  // Check content-type
  if (req.headers["content-type"] !== "application/pdf") {
    throw new Error("Invalid content-type. Only application/pdf is supported.")
  }

  console.log("Request OK: valid content-type")

  // Make sure pingback address is provided
  if (!req.headers["x-pingback"]) {
    throw new Error("Pingback required")
  }

  const pingback = req.headers["x-pingback"]
  req.pingback = Array.isArray(pingback) ? pingback[0] : pingback
  console.log(`Request OK: pingback ${req.pingback} provided`)

  // Store forwardData if provided
  const forwardData = req.headers["x-forward-data"] || null
  req.forwardData = Array.isArray(forwardData) ? forwardData[0] : forwardData

  postPingback(req.pingback, {
    status: "processing",
    message: "Valid request received by conveyor",
    forwardData: req.forwardData,
  })

  next()
}
