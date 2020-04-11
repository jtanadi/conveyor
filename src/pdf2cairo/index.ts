import { spawn } from "child_process"
import acceptableFormats from "./acceptableFormats"

class PDF2Cairo {
  private parseFormat(format: string): string {
    let outputFormat = format.toLowerCase()
    if (outputFormat.startsWith("-") || outputFormat.startsWith(".")) {
      outputFormat = outputFormat.slice(1)
    }

    if (outputFormat === "jpg") {
      outputFormat = "jpeg"
    } else if (outputFormat === "tif") {
      outputFormat = "tiff"
    }

    if (!acceptableFormats.get(outputFormat)) {
      throw new Error(`${outputFormat} is not a currently-accepted format.`)
    }

    return `-${outputFormat}`
  }

  convert(
    inputPath: string,
    outputPath: string,
    outputFormat?: string
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const format = outputFormat ? this.parseFormat(outputFormat) : "-jpeg"
      const p2c = spawn("pdftocairo", [format, inputPath, outputPath])

      p2c.stderr.on("data", (data) => {
        reject(`pdftocairo error: ${data}`)
      })

      p2c.on("close", (code) => {
        resolve()
        console.log(`pdftocairo exited with code ${code}`)
      })
    })
  }
}

export default new PDF2Cairo()
