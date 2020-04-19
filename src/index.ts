require("dotenv").config()

import app from "./app"
const PORT = parseInt(process.env.PORT) || 3000

app.start(PORT).then(() => {
  console.log(`conveyor running on port ${PORT}`)

  if (process.env.NODE_ENV !== "production" && process.env.LOCAL) {
    console.warn("\x1b[30m\x1b[43m%s\x1b[0m", "CONVEYOR IN LOCAL DEV MODE")
  }
})
