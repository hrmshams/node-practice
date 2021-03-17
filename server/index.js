const express = require("express")
const app = express()
const port = 3000

function sleep(milsec) {
  return new Promise((res, rej) => {
    return setTimeout(res, milsec)
  })
}

app.get("/", async (req, res) => {
  console.log("received!")
  await sleep(100000)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
