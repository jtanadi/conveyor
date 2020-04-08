require("dotenv").config()

import app from "./app"
const PORT = parseInt(process.env.PORT) || 3000

app.start(PORT).then(() => console.log(`conveyor running on port ${PORT}`))
