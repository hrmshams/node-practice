const http = require('http')
const cp = require('child_process')

const spawnOpts = {
  cwd: null,
  env: null,
  detached: false
}
function spawnAnotherServer(){
  const childProcess = cp.spawn('node', ['./process2.js'],spawnOpts)
  childProcess.stdout.on('data', (data)=>{
    console.log(JSON.parse(data.toString()))
  })
  childProcess.stderr.on('data', (data)=>{
    console.log('err : '  + data.toString())
  })
  childProcess.on('close', code => {
    console.log('process code : ' + code)
  })
}

// http.createServer((req, res) => {

// }).listen(3000)

// console.log('server is running on port 3000')

spawnAnotherServer()

