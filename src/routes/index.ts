import { Service, Protocol, Request, Response } from "restana"

import pdf from "./pdf"
import ping from "./ping"

export { pdf as pdfRoute, ping as pingRoute }

export const homeRoute = (
  app: Service<Protocol.HTTPS | Protocol.HTTP>
): void => {
  app.get(
    "/",
    (req: Request<Protocol.HTTPS>, res: Response<Protocol.HTTPS>): void => {
      res.send("", 301, { Location: "https://github.com/raa-tools/conveyor/" })
    }
  )
}
