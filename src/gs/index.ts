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

  private getArgs(
    device: string,
    inputPath: string,
    outputPath: string,
    extension: string,
    resolution: number,
    page?: number
  ): string[] {
    const retArgs = [device, `-r${resolution}`]

    if (page) {
      retArgs.push(
        `-sPageList=${page}`,
        "-o",
        `${outputPath}${page.toString().padStart(3, "0")}${extension}`
      )
    } else {
      retArgs.push("-o", `${outputPath}%03d${extension}`)
    }

    retArgs.push(inputPath)

    return retArgs
  }

  convert(
    inputPath: string,
    outputPath: string,
    outputFormat: string = "jpeg",
    resolution: number = 72,
    page?: number
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const { device, extension } = this.parseFormat(outputFormat)
      const gsArgs = this.getArgs(
        device,
        inputPath,
        outputPath,
        extension,
        resolution,
        page
      )

      const gsProcess = spawn("gs", gsArgs)

      gsProcess.stderr.on("data", (data: string): void => {
        reject(`ghostscript error: ${data}`)
      })

      gsProcess.on("close", (code: string): void => {
        resolve()
        console.log(`ghostscript exited with code ${code}`)
      })
    })
  }
}

export default new GhostAdaptor()
