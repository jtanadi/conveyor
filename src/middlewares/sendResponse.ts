import { Protocol, Request, Response } from "restana"

export default (
  req: Request<Protocol.HTTPS>,
  res: Response<Protocol.HTTPS>,
  next: () => void
): void => {
  res.send({ message: "Processing file" }, 200)
  next()
}
