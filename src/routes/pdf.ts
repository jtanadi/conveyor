import axios from "axios"
import { Service, Protocol } from "restana"

import { ExtendedRequest } from "../types"

import {
  parseHeader,
  parseQueryString,
  sendResponse,
  processFile,
  uploadToS3,
  cleanup,
} from "../middlewares/"

export default (app: Service<Protocol.HTTPS | Protocol.HTTP>): void => {
  app.post(
    "/api/convert/pdf",
    parseHeader,
    parseQueryString,
    sendResponse,
    processFile,
    uploadToS3,
    cleanup,
    (req: ExtendedRequest): void => {
      console.log("conveyor success")
      const { s3Dir, pages } = req.locals

      // pingback
      axios.post(req.pingback, { s3Dir, pages })
    }
  )
}
