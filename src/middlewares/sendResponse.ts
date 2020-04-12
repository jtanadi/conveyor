import { Protocol, Request, Response } from "restana"
import processQueue from "../utils/processQueue"

// send response and run task
export default (
  req: Request<Protocol.HTTPS>,
  res: Response<Protocol.HTTPS>
): void => {
  res.send({ message: "Processing file" }, 200)

  processQueue()
}
