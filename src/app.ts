import restana from "restana"

import { useHttps } from "./middlewares"
import { homeRoute, pingRoute, pdfRoute } from "./routes"

const app = restana({
  errorHandler(err, req, res) {
    console.error(err)
    res.send("Server error", 500)
  },
})

app.use(useHttps)

homeRoute(app)
pingRoute(app)
pdfRoute(app)

export default app
