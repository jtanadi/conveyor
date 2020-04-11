import restana from "restana"
import cors from "cors"

import { useHttps } from "./middlewares"
import { homeRoute, pingRoute, pdfRoute } from "./routes"

const app = restana({
  errorHandler(err, req, res) {
    console.error(err)
    res.send("Server error", 500)
  },
})

app.use(useHttps)
app.use(cors())

homeRoute(app)
pingRoute(app)
pdfRoute(app)

export default app
