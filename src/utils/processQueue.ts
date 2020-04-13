import axios from "axios"
import path from "path"

import cleanup from "./cleanup"
import gs from "../gs"
import queue from "./queue"
import uploadToS3 from "./uploadToS3"

type PostData = {
  s3Dir: string
  files: string[]
  forwardData?: string
}

const outputResolution = 150

export default async (): Promise<void> => {
  const task = queue.dequeue()

  const { pingback, filename, inputFilePath, outputDir, outFileType } = task

  /* eslint-disable no-useless-catch */
  try {
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

    axios.post(pingback, postData)
    cleanup(outputDir)
  } catch (e) {
    throw e
  }
}
