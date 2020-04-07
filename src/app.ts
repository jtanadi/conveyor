import restana, { Protocol, Request, Response } from "restana"

import { checkType, processFile, uploadToS3, cleanup } from "./middlewares/"

const app = restana({
  errorHandler(err, req, res) {
    console.error(err)
    res.send("Server error", 500)
  },
})

app.get("/", (req, res): void => {
  console.log(`Request received - ${req.url}`)
  res.end()
})

app.post(
  "/api/upload",
  checkType,
  processFile,
  uploadToS3,
  cleanup,
  (req: Request<Protocol.HTTPS>, res: Response<Protocol.HTTPS>): void => {
    console.log("conveyor success")
    const { s3Dir, pages } = req.locals
    res.send({ s3Dir, pages })
  }
)

export default app
