// This doesn't quite work right yet
// Currently using src/types.ts for ExtendedRequest interface

interface Locals {
  cairoDir?: string
  s3Dir?: string
  pages?: string[]
}

declare global {
  module Restana {
    interface RequestExtensions {
      locals: Locals
    }
  }
}

export {}
