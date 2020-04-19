import { Protocol, Request, Response } from "restana"

// send response and run task
export default (
  req: Request<Protocol.HTTPS>,
  res: Response<Protocol.HTTPS>,
  next: () => void
): void => {
  res.send({ message: "Processing file" }, 200)

  next()
}
