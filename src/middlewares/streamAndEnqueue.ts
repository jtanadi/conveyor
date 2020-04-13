import { Protocol, Response } from "restana"
import { ExtendedRequest } from "../types"
import fs from "fs"
import path from "path"
import { nanoid } from "nanoid"

import queue, { Task } from "../utils/queue"
import tempDir from "../utils/tempDir"

export default (
  req: ExtendedRequest,
  res: Response<Protocol.HTTPS>,
  next: () => void
): void => {
  const filename = nanoid()
  const cairoOutputDir = path.join(tempDir, "cairo", filename)

  if (!fs.existsSync(cairoOutputDir)) {
    console.log(`creating ${cairoOutputDir}`)
    fs.mkdirSync(cairoOutputDir, { recursive: true })
  }

  const saveToPath = path.join(tempDir, `${filename}.pdf`)
  req.pipe(fs.createWriteStream(saveToPath))

  req.on("end", async () => {
    const task: Task = {
      roomID: req.roomID,
      pingback: req.pingback,
      outFileType: req.outFileType,
      clientDownload: req.clientDownload,
      filename,
      inputFilePath: saveToPath,
      outputDir: cairoOutputDir,
    }

    queue.enqueue(task)
    next()
  })

  req.on("error", (e: Error) => {
    throw e
  })
}