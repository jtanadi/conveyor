import express, { Application, Request, Response, NextFunction } from "express"

import { checkType, processFile, uploadToS3, cleanup } from "./middlewares/"

const app: Application = express()

app.get("/", (req: Request, res: Response): void => {
  console.log(`Request received - ${req.url}`)
  res.end()
})

app.post(
  "/api/upload",
  checkType,
  processFile,
  uploadToS3,
  cleanup,
  (req: Request, res: Response): void => {
    console.log("conveyor success")
    const { s3Dir, pages } = req.locals
    res.send({ s3Dir, pages })
  }
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  res.status(500).send("Server error")
})

export default app
