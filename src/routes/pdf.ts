import { Service, Protocol } from "restana"
import {
  parseHeaders,
  parseQueryString,
  processQueue,
  sendResponse,
  streamAndEnqueue,
} from "../middlewares/"

export default (app: Service<Protocol.HTTPS | Protocol.HTTP>): void => {
  app.post(
    "/api/convert/pdf",
    parseHeaders,
    parseQueryString,
    streamAndEnqueue,
    sendResponse,
    processQueue
  )
}
