import { Protocol, Request } from "restana"

interface Locals {
  cairoDir?: string
  s3Dir?: string
  pages?: string[]
}

export interface ExtendedRequest extends Request<Protocol.HTTPS> {
  locals: Locals
}
