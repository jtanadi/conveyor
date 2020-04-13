import { spawn } from "child_process"
import acceptableFormats from "./acceptableFormats"

// Simple adaptor to run GhostScript
// gs -sDEVICE=png16 -o output/page-%d.png -r150 large-drawing.pdf

type OutputFormatData = {
  device: string
  extension: string
}

class GhostAdaptor {
  private parseFormat(format: string): OutputFormatData {
    let outputFormat = format.toLowerCase()
    if (outputFormat.startsWith(".")) {
      outputFormat = outputFormat.slice(1)
    }

    if (outputFormat === "jpeg") {
      outputFormat = "jpg"
    } else if (outputFormat === "tiff") {
      outputFormat = "tif"
    }

    const deviceFormat = acceptableFormats.get(outputFormat)
    if (!deviceFormat) {
      throw new Error(`${outputFormat} is not a currently-accepted format.`)
    }

    return { device: `-sDEVICE=${deviceFormat}`, extension: `.${outputFormat}` }
  }

  convert(
    inputPath: string,
    outputPath: string,
    outputFormat: string = "jpeg",
    resolution: number = 150
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const { device, extension } = this.parseFormat(outputFormat)

      console.log(
        `RUNNING: gs ${device} -o ${outputPath}-%d${extension} -r${resolution} ${inputPath}`
      )

      const gs = spawn("gs", [
        device,
        "-o",
        `${outputPath}-%d${extension}`,
        `-r${resolution}`,
        inputPath,
      ])

      gs.stderr.on("data", (data: string): void => {
        reject(`ghostscript error: ${data}`)
      })

      gs.on("close", (code: string): void => {
        resolve()
        console.log(`ghostscript exited with code ${code}`)
      })
    })
  }
}

export default new GhostAdaptor()
