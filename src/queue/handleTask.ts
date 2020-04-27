import path from "path"

import gs from "../gs"
import { Task } from "./"

import {
  cleanup,
  measurePDF,
  optimize,
  getResolutions,
  postPingback,
  uploadToS3,
} from "../utils/"

export default async (task: Task): Promise<void> => {
  const { pingback, filename, inputFilePath, outputDir, outFileType } = task

  try {
    await postPingback(pingback, {
      status: "processing",
      message: "Converting file",
      forwardData: task.forwardData,
    })

    const measurements: number[][] = await measurePDF(inputFilePath)
    const outputResolutions: number[] = getResolutions(measurements)
    const outputPath = path.join(outputDir, "page")

    await Promise.all(
      outputResolutions.map(async (resolution, i) => {
        const outputFilePath = await gs.convert(
          inputFilePath,
          outputPath,
          outFileType,
          resolution,
          i + 1
        )

        return optimize(outputFilePath)
      })
    )
  } catch (e) {
    console.error(e)
    return postPingback(pingback, {
      status: "error",
      message: `Error converting ${task.filename}`,
      forwardData: task.forwardData,
    })
  }

  try {
    await postPingback(pingback, {
      status: "processing",
      message: "Uploading to S3",
      forwardData: task.forwardData,
    })

    // Disable uploading and posting in testing
    if (process.env.NODE_ENV !== "production" && process.env.LOCAL) {
      console.log("\x1b[33m%s\x1b[0m", "* Converted files not uploaded *", "\n")
      postPingback(pingback, {
        status: "end",
        message: {
          s3Dir: "s3-directory-abcde",
          files: ["sample-file1.png", "sample-file2.png"],
        },
        forwardData: task.forwardData,
      })
    } else {
      const files = await uploadToS3(outputDir, filename, outFileType)
      await postPingback(pingback, {
        status: "end",
        message: { s3Dir: filename, files },
        forwardData: task.forwardData,
      })
    }
  } catch (e) {
    console.error(e)
    return postPingback(pingback, {
      status: "error",
      message: `Error uploading ${task.filename} to S3`,
      forwardData: task.forwardData,
    })
  }

  cleanup(inputFilePath, outputDir)
}
