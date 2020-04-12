import restana from "restana"
import bodyParser from "body-parser"

const testServer = restana()
testServer.use(bodyParser.json())

const PORT = parseInt(process.env.TEST_PORT) || 5000

testServer.post("/pingback", (req, res) => {
  console.log("PINGBACK DATA START")
  console.log(req.body)
  console.log("PINGBACK COMPLETE")
  res.end()
})

testServer
  .start(PORT)
  .then(() => console.log(`Test server running on port ${PORT}`))
