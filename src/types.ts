import { Protocol, Request } from "restana"

export interface ExtendedRequest extends Request<Protocol.HTTPS> {
  outFileType: string
  clientDownload: boolean
  pingback: string
  forwardData?: string
}

export type EndMessage = {
  s3Dir: string
  files: string[]
}

export type PingbackData = {
  status: string
  message: string | EndMessage
  forwardData: string | null
}
