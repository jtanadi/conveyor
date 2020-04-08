import restana, { Protocol, Request, Response } from "restana"
import { ExtendedRequest } from "./types"

import {
  useHttps,
  checkType,
  processFile,
  uploadToS3,
  cleanup,
} from "./middlewares/"

const app = restana({
  errorHandler(err, req, res) {
    console.error(err)
    res.send("Server error", 500)
  },
})

app.use(useHttps)

app.get(
  "/",
  (req: Request<Protocol.HTTPS>, res: Response<Protocol.HTTPS>): void => {
    res.send("", 301, { Location: "https://github.com/raa-tools/conveyor/" })
  }
)

app.get("/api/ping", (req, res): void => {
  res.send({ message: "OK" })
})

app.post(
  "/api/upload",
  checkType,
  processFile,
  uploadToS3,
  cleanup,
  (req: ExtendedRequest, res: Response<Protocol.HTTPS>): void => {
    console.log("conveyor success")
    const { s3Dir, pages } = req.locals
    res.send({ s3Dir, pages })
  }
)

export default app
