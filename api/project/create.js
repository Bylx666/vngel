const fs = require('fs')
const path = require('path')

const dataDir = '../data'

module.exports = (name, Res, forced)=>{
  if(forced) {
    callback(true)
  }else {
    require('./checkName')(name, null, 
      result=>callback(result)
    )
  }

  function callback(nameStatus) {
    if(nameStatus!==-1) {
      Res.writeHead(403, {
        'content-type': 'text/plain; charset=utf8'
      })
      Res.end('Something went wrong. Use `?forced` to overwrite or'+
      ' use `/checkName` to see details.')
    }else {
      try {
        fs.mkdirSync(
          path.join(__dirname, dataDir, name), 
          { recursive: true }
        )
        const json = {
          name: name.replace('/', ''),
          creation_time: Date.now(),
          last_modification: Date.now(),
        }
        fs.writeFileSync(
          path.join(__dirname, dataDir, name, 'index.json'), 
          JSON.stringify(json, null, 2)
        )
        Res.writeHead(200, {
          'content-type': 'text/plain; charset=utf8'
        })
        Res.end('ok')
      }catch (err){
        Res.writeHead(403, {
          'content-type': 'text/plain; charset=utf8'
        })
        Res.end(err.toString())
      }
    }
  }
}
