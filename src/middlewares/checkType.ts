import { Protocol, Request, Response } from "restana"

export default (
  req: Request<Protocol.HTTPS>,
  res: Response<Protocol.HTTPS>,
  next: () => void
): void => {
  if (req.headers["content-type"] !== "application/pdf") {
    throw new Error("Invalid content-type. Only application/pdf is supported.")
  }

  console.log("Request OK: valid content-type")
  next()
}
