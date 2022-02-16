const fs = require('fs')
const path = require('path')

module.exports = (name, Res)=>{
  fs.access(
    path.join(__dirname, 'data', name),
    fs.constants.R_OK | fs.constants.W_OK,
    (err)=>{
      Res.writeHead(200, {
        'content-type': 'text/plain'
      })
      if(err) {
        Res.end('true')
      }else {
        Res.end('false')
      }
    }
  )
}
