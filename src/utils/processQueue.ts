import axios from "axios"
import path from "path"

import cleanup from "./cleanup"
import measurePDF from "./measurePDF"
import getResolution from "./getResolution"
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
    // Get page measurements and calculate resolution based on max sizes
    // Measurements are arrays of [width, height]
    const measurements: number[][] = await measurePDF(inputFilePath)
    const outputResolution = getResolution(measurements)

    console.log(`Converting at ${outputResolution}DPI`)

    const outputFilePath = path.join(outputDir, "page")
    await gs.convert(
      inputFilePath,
      outputFilePath,
      outFileType,
      outputResolution
    )

    const files = await uploadToS3(outputDir, filename, outFileType)
    const postData: PostData = { s3Dir: filename, files }
    if (task.forwardData) {
      postData.forwardData = task.forwardData
    }

    await axios.post(pingback, postData)
    cleanup(outputDir)
  } catch (e) {
    console.log(`Error with task ${task}`)
    console.log(e.stack)
  }
}
