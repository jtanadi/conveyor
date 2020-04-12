import axios from "axios"
import path from "path"
import pdf2cairo from "../pdf2cairo"
import queue from "./queue"
import tempDir from "./tempDir"
import uploadToS3 from "./uploadToS3"

type PostData = {
  roomID?: string
  s3Dir: string
  pages: string[]
}

export default async (): Promise<void> => {
  const task = queue.dequeue()
  const { pingback, filename, inputFilePath, outputDir, outFileType } = task

  /* eslint-disable no-useless-catch */
  try {
    const outputFilePath = path.join(outputDir, "page")
    await pdf2cairo.convert(inputFilePath, outputFilePath, outFileType)

    const pages = await uploadToS3(outputDir, filename, outFileType)

    let postData: PostData = { s3Dir: filename, pages }
    if (task.roomID) {
      postData.roomID = task.roomID
    }

    axios.post(pingback, postData)

    queue.cleanup(tempDir)
  } catch (e) {
    throw e
  }
}
