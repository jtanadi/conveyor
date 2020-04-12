import { Service, Protocol } from "restana"
import {
  parseHeader,
  parseQueryString,
  sendResponse,
  streamAndEnqueue,
} from "../middlewares/"

export default (app: Service<Protocol.HTTPS | Protocol.HTTP>): void => {
  app.post(
    "/api/convert/pdf",
    parseHeader,
    parseQueryString,
    streamAndEnqueue,
    sendResponse
  )
}
