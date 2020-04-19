export type Task = {
  pingback: string
  outFileType: string
  clientDownload: boolean
  filename: string
  inputFilePath: string
  outputDir: string
  forwardData?: string
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

  processTask(cb: (task: Task) => void | Promise<void>): void {
    const task = this.dequeue()
    cb(task)
  }
}

export default new Queue()
