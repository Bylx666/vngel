const http = require('http')
const fs = require('fs')
const path = require('path')

const conf = require('./conf.json');
const { getView, mimes } = require('./asset/views');

const read = (filepath)=> {
  try {
    return fs.readFileSync(
      path.join(__dirname, filepath)
    )
  }catch {
    return ''
  }
}
const quickRes = (Res, mime, end)=> {
  if(end==='') {
    Res.writeHead(404, {
      'content-type': 'text/html'
    })
    Res.end(getView('404'))
  }else {
    Res.writeHead(200, {
      'content-type': mime
    })
    Res.end(end)
  }
}

const localPort = process.env.PORT | conf.localPort
http.createServer((Req, Res)=>{
  const url = Req.url
  const urlPath = new URL(url, 'http://0.0.0.0').pathname

  if(urlPath==='/favicon.ico') {
    quickRes(Res, 'image/png', read('/asset/favicon.png'))

  }else if(url.indexOf('/pages')===0){// page files
    quickRes(Res, 'text/html', getView(url))

  }else if(url.indexOf('/asset')===0||url.indexOf('/lang')===0){
    quickRes(Res, mimes.get(url), read('/asset/views'+url))

  }else if(urlPath==='/') {
    quickRes(Res, 'text/html', getView('home'))

  }else if(urlPath==='/api'||urlPath==='/api/') {
    Res.writeHead(200, {
      'content-type': 'text/plain'
    })
    Res.end('Api fine')

  }else if(url.indexOf('/api/')===0) {
    require('./api')(url, Res)

  }else if(urlPath==='/e'||urlPath==='/e/') {
    quickRes(Res, 'text/html', getView('editor'))
  }else {
    quickRes(Res, '', '')
  }
}).listen(localPort, ()=>{
  console.log(`Running at http://localhost:${localPort}`);
})


