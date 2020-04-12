import { Protocol, Request } from "restana"

export interface ExtendedRequest extends Request<Protocol.HTTPS> {
  outFileType: string
  clientDownload: boolean
  pingback: string
  roomID?: string
}
