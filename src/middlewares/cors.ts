import { Protocol, Request, Response } from "restana"

export default (
  req: Request<Protocol.HTTPS>,
  res: Response<Protocol.HTTP>,
  next: () => void
): void => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  )

  next()
}
