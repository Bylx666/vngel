const http = require('http')
const fs = require('fs')
const path = require('path')

const conf = JSON.parse(fs.readFileSync('./conf.json', {encoding: 'utf8'}))

const read = (filepath)=> fs.readFileSync(
  path.join(__dirname, filepath)
)
const quickRes = (Res, mime, end)=> {
  Res.writeHead(200, {
    'content-type': mime
  })
  Res.end(end)
}

const localPort = process.env.PORT | conf.localPort
http.createServer((Req, Res)=>{
  const url = Req.url

  if(url==='/favicon.ico') {
    quickRes(Res, 'image/png', read('/asset/favicon.png'))
  }else if(url==='/t.js'){
    quickRes(Res, 'application/javascript', read('/asset/views/t.js'))
  }else if(url==='/') {
    quickRes(Res, 'text/html', read('asset/views/newProj.html'))
  }else if(url==='/api'||url==='/api/') {
    const returnJSON = JSON.stringify({
      status: 'terrible',
      message: 'Access Denied'
    })
    Res.writeHead(403, {
      'content-type': 'application/json'
    })
    Res.end(returnJSON)
  }else if(url.indexOf('/api/')===0) {
    require('./api')(url, Res)
  }
}).listen(localPort, ()=>{
  console.log(`Running at http://localhost:${localPort}`);
})


