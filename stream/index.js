const fs = require("fs")
const readable = fs.createReadStream("file.txt")
const writable = fs.createWriteStream("output.txt")

readable.on("readable", () => {
  let chunk
  console.log("Stream is readable (new data received in buffer)")
  // Use a loop to make sure we read all currently available data
  while (null !== (chunk = readable.read(5000))) {
    // console.log(chunk)
    console.log(`Read ${chunk.length} bytes of data...`)
    writable.write(chunk, (err) => {
      console.log(err)
    })
  }
})
