import { spawn } from "child_process"

export default (filepath: string, page: number): Promise<void> => {
  return new Promise((resolve) => {
    const realFilepath = `${filepath}${page.toString().padStart(3, "0")}.png`
    const opti = spawn("optipng", [realFilepath])

    console.log(`optimizing ${realFilepath}`)

    opti.on("close", (code: string) => {
      resolve()
      console.log(`optipng exited with code ${code}. Optimized ${realFilepath}`)
    })
  })
}
