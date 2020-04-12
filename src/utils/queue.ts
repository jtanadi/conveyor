import rimraf from "rimraf"

export type Task = {
  roomID?: string
  pingback: string
  outFileType: string
  clientDownload: boolean
  filename: string
  inputFilePath: string
  outputDir: string
}

class Queue {
  queue: Task[]

  constructor() {
    this.queue = []
  }

  enqueue(task: Task): void {
    this.queue.push(task)
  }

  dequeue(): Task {
    return this.queue.shift()
  }

  cleanup(dirToRemove: string): void {
    if (!this.queue.length) {
      rimraf(dirToRemove, (err: Error): void => {
        if (err) throw err
        console.log(`success deleting ${dirToRemove}`)
      })
    }
  }
}

export default new Queue()
