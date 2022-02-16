const fs = require('fs')
const path = require('path')

module.exports = (usp, Res)=>{
  const name = decodeURIComponent( usp.get('name') || 'untitled' )

  try {
    fs.mkdirSync(
      path.join(__dirname, 'data', name), 
      { recursive: true }
    )
    fs.writeFileSync(
      path.join(__dirname, 'data', name, 'index.json'), 
      JSON.stringify({
        a: 'b',
        c: 'd'
      })
    )
    Res.writeHead(200, {
      'content-type': 'text/plain'
    })
    Res.end('ok')
  }catch (err){
    Res.writeHead(403, {
      'content-type': 'text/plain'
    })
    Res.end(err.toString())
  }
}
