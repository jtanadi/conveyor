import axios from "axios"
import path from "path"

import cleanup from "./cleanup"
import measurePDF from "./measurePDF"
import getResolutions from "./getResolutions"
import gs from "../gs"
import queue from "./queue"
import uploadToS3 from "./uploadToS3"

type PostData = {
  s3Dir: string
  files: string[]
  forwardData?: string
}

export default async (): Promise<void> => {
  const task = queue.dequeue()

  const { pingback, filename, inputFilePath, outputDir, outFileType } = task

  try {
    const measurements: number[][] = await measurePDF(inputFilePath)
    const outputResolutions: number[] = getResolutions(measurements)
    const outputFilePath = path.join(outputDir, "page")

    await Promise.all(
      outputResolutions.map((resolution, i) => {
        return gs.convert(
          inputFilePath,
          outputFilePath,
          outFileType,
          resolution,
          i + 1
        )
      })
    )

    // Disable uploading and posting in testing
    if (process.env.NODE_ENV !== "production" && process.env.LOCAL) {
      console.warn("\x1b[30m\x1b[43m%s\x1b[0m", "CONVEYOR IN LOCAL DEV MODE")
      console.log("\x1b[33m%s\x1b[0m", "* Converted files not uploaded")
      console.log("\x1b[33m%s\x1b[0m", "* No POST made to pingback URL")
    } else {
      const files = await uploadToS3(outputDir, filename, outFileType)
      const postData: PostData = { s3Dir: filename, files }
      if (task.forwardData) {
        postData.forwardData = task.forwardData
      }

      axios.post(pingback, postData)
    }

    cleanup(inputFilePath, outputDir)
  } catch (e) {
    console.log(`Error with task ${task}`)
    console.log(e.stack)
  }
}
