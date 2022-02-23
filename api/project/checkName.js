const fs = require('fs')
const path = require('path')

const dataDir = '../data'

module.exports = (name, Res, inModule)=>{
  name = name.replace('/', '')
  if(!name) {
    if(inModule) {
      inModule(-20)
    }else {
      Res.writeHead(403, {
        'content-type': 'text/plain'
      })
      Res.end('Name for checking required')
    }
    return
  }
  if(name.includes('/')) {
    if(inModule) {
      inModule(-30)
    }else {
      Res.writeHead(403, {
        'content-type': 'text/plain'
      })
      Res.end('Subfolder denies')
    }
    return
  }

  fs.access(
    path.join(__dirname, dataDir, name),
    fs.constants.R_OK | fs.constants.W_OK,
    (err)=>{
      if(inModule) {
        if(err) {
          inModule(-1)
        }else {
          inModule(0)
        }
      }else {
        Res.writeHead(200, {
          'content-type': 'text/plain'
        })
        if(err) {
          Res.end('true')
        }else {
          Res.end('false')
        }
      }
    }
  )
}
