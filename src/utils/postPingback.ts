import axios from "axios"
import { PingbackData } from "../types"

export default async (
  pingbackAddress: string,
  data: string | PingbackData
): Promise<void> => {
  if (process.env.NODE_ENV !== "production" && process.env.LOCAL) {
    console.log("\x1b[33m%s\x1b[0m", "* Data to be sent to pingback below *")
    console.log("\x1b[33m%s\x1b[0m", "* No POST made to pingback URL *")
    console.log("DATA", data, "\n")
  } else {
    try {
      await axios.post(pingbackAddress, data)
    } catch (e) {
      console.error(e)
    }
  }
}
