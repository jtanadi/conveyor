import { Protocol, Response } from "restana"
import { ExtendedRequest } from "../types"
import fs from "fs"
import path from "path"
import { nanoid } from "nanoid"

import postPingback from "../utils/postPingback"
import queue, { Task } from "../queue"

export default (
  req: ExtendedRequest,
  res: Response<Protocol.HTTPS>,
  next: () => void
): void => {
  const tempDir = path.join(__dirname, "../../tmp/")
  const filename = nanoid()
  const outputDir = path.join(tempDir, "gs", filename)

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const saveToPath = path.join(tempDir, `${filename}.pdf`)
  req.pipe(fs.createWriteStream(saveToPath))

  req.on("end", async () => {
    const task: Task = {
      pingback: req.pingback,
      outFileType: req.outFileType,
      clientDownload: req.clientDownload,
      filename,
      inputFilePath: saveToPath,
      outputDir,
      forwardData: req.forwardData,
    }

    postPingback(req.pingback, {
      status: "processing",
      message: "Queuing up task",
      forwardData: task.forwardData,
    })

    queue.enqueue(task)
    next()
  })

  req.on("error", (e: Error) => {
    throw e
  })
}
