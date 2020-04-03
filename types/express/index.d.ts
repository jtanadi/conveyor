interface Locals {
  cairoDir?: string
  s3Dir?: string
  pages?: string[]
}

declare global {
  module Express {
    interface Request {
      locals: Locals
    }
  }
}

export {}
