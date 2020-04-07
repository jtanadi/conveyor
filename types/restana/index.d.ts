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
