import { Protocol, Response } from "restana"
import { ExtendedRequest } from "../types"
import fs from "fs"
import path from "path"
import { nanoid } from "nanoid"

import queue, { Task } from "../utils/queue"

export default (
  req: ExtendedRequest,
  res: Response<Protocol.HTTPS>,
  next: () => void
): void => {
  const tempDir = path.join(__dirname, "../../tmp/")
  const filename = nanoid()
  const cairoOutputDir = path.join(tempDir, "cairo", filename)

  if (!fs.existsSync(cairoOutputDir)) {
    fs.mkdirSync(cairoOutputDir, { recursive: true })
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
      outputDir: cairoOutputDir,
    }

    if (req.forwardData) {
      task.forwardData = req.forwardData
    }

    queue.enqueue(task)
    next()
  })

  req.on("error", (e: Error) => {
    throw e
  })
}
