import { Service, Protocol, Request, Response } from "restana"

export default (app: Service<Protocol.HTTPS | Protocol.HTTP>): void => {
  app.get(
    "/api/ping",
    (req: Request<Protocol.HTTPS>, res: Response<Protocol.HTTPS>): void => {
      res.send({ message: "OK" })
    }
  )
}
