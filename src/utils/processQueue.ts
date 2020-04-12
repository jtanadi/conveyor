import axios from "axios"
import path from "path"
import pdf2cairo from "../pdf2cairo"
import queue from "./queue"
import tempDir from "./tempDir"
import uploadToS3 from "./uploadToS3"

export default async (): Promise<void> => {
  const {
    pingback,
    filename,
    inputFilePath,
    outputDir,
    outFileType,
  } = queue.dequeue()

  /* eslint-disable no-useless-catch */
  try {
    const outputFilePath = path.join(outputDir, "page")
    await pdf2cairo.convert(inputFilePath, outputFilePath, outFileType)

    const pages = await uploadToS3(outputDir, filename, outFileType)

    axios.post(pingback, { s3Dir: filename, pages })

    queue.cleanup(tempDir)
  } catch (e) {
    throw e
  }
}
