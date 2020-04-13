import axios from "axios"
import path from "path"
import gs from "../gs"
import queue from "./queue"
import tempDir from "./tempDir"
import uploadToS3 from "./uploadToS3"

type PostData = {
  s3Dir: string
  pages: string[]
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

    const pages = await uploadToS3(outputDir, filename, outFileType)

    let postData: PostData = { s3Dir: filename, pages }
    if (task.forwardData) {
      postData.forwardData = task.forwardData
    }

    axios.post(pingback, postData)

    queue.cleanup(tempDir)
  } catch (e) {
    throw e
  }
}
