import restana from "restana"
import cors from "cors"

import { useHttps } from "./middlewares"
import { homeRoute, pingRoute, pdfRoute } from "./routes"

const app = restana({
  errorHandler(err, req, res) {
    console.error("\x1b[31m%s\x1b[0m", `${err.name}: ${err.message}`)

    if (err.message) {
      res.send({ error: err.message }, 500)
    }
  },
})

app.use(cors())
app.use(useHttps)

homeRoute(app)
pingRoute(app)
pdfRoute(app)

export default app
