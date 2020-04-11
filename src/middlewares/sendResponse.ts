import { Protocol, Request, Response } from "restana"

export default (
  req: Request<Protocol.HTTPS>,
  res: Response<Protocol.HTTPS>,
  next: () => void
): void => {
  next()
  res.send({ message: "Processing file" }, 200)
}
