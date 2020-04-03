import { Request, Response, NextFunction } from "express"
export default (req: Request, res: Response, next: NextFunction) => {
  if (req.headers["content-type"] !== "application/pdf") {
    throw new Error("Invalid content-type. Only application/pdf is supported.")
  }

  console.log("Request OK: valid content-type")
  next()
}
