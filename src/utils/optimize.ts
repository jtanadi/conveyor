import { spawn } from "child_process"

export default (filepath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log(`optimizing ${filepath}`)
    const opti = spawn("optipng", [filepath])

    opti.on("error", (err) => {
      console.error(err)
    })

    opti.on("close", (code: number) => {
      // We have to check exit code here because
      // `optipng` outputs its trial data to stderr
      // so we can't do error handling with opti.stderr.on("error")
      if (code !== 0) {
        console.error(`optipng exited with code ${code}`)
        reject(`Error optimizing ${filepath}`)
      } else {
        console.log(`optipng exited with code ${code}. Optimized ${filepath}`)
        resolve()
      }
    })
  })
}
