import { Service, Protocol, Response } from "restana"
import { ExtendedRequest } from "../types"

import {
  checkType,
  parseQueryString,
  processFile,
  uploadToS3,
  cleanup,
} from "../middlewares/"

export default (app: Service<Protocol.HTTPS | Protocol.HTTP>) => {
  app.post(
    "/api/convert/pdf",
    checkType,
    parseQueryString,
    processFile,
    uploadToS3,
    cleanup,
    (req: ExtendedRequest, res: Response<Protocol.HTTPS>): void => {
      console.log("conveyor success")
      const { s3Dir, pages } = req.locals
      res.send({ s3Dir, pages })
    }
  )
}
