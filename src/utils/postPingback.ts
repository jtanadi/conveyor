import axios from "axios"
import { PingbackData } from "../types"

export default (pingbackAddress: string, data: string | PingbackData): void => {
  if (process.env.NODE_ENV !== "production" && process.env.LOCAL) {
    console.log("\x1b[33m%s\x1b[0m", "* Data to be sent to pingback below *")
    console.log("\x1b[33m%s\x1b[0m", "* No POST made to pingback URL *")
    console.log("DATA", data, "\n")
  } else {
    axios.post(pingbackAddress, data)
  }
}
