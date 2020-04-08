import { Protocol, Request, Response } from "restana"
import { TLSSocket } from "tls"

export default (
  req: Request<Protocol.HTTPS>,
  res: Response<Protocol.HTTPS>,
  next: () => void
) => {
  const host = req.headers.host
  const forwardedProtocol = req.headers["x-forwarded-proto"] || ""
  const isSecure =
    (req.socket as TLSSocket).encrypted || forwardedProtocol === "https"

  if (isSecure || host.startsWith("localhost")) {
    next()
  } else {
    const httpsUrl = `https://${host}${req.url}`
    res.send("", 301, { Location: httpsUrl })
  }
}
