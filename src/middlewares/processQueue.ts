import queue from "../queue"
import handleTask from "../queue/handleTask"

export default (): void => {
  queue.processTask(handleTask)
}
