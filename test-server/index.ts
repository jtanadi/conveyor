import restana from "restana"
import bodyParser from "body-parser"

const testServer = restana()
testServer.use(bodyParser.json())

testServer.post("/pingback", (req, res) => {
  console.log("PINGBACK DATA START")
  console.log(req.body)
  console.log("PINGBACK COMPLETE")
  res.end()
})

testServer
  .start(5000)
  .then(() => console.log("Test server running on port 5000"))
