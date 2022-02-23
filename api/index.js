const fs = require('fs')
const path = require('path')

function api(url, Res) {
  url = new URL(url, 'http://0.0.0.0');
  let pathname = url.pathname.replace('/api', '')

  const pathStW = (stWName)=>{// path STarts With Name
    return pathname.indexOf(stWName)===0
  }

  const usp = url.searchParams // content in params
  const inPath = (name)=> {// content in path
    return decodeURIComponent(pathname.replace(name, ''))
  }

  if(pathStW('/project/checkName')) {
    require('./project/checkName')(
      inPath('/project/checkName'), 
      Res
    )
  }else if(pathStW('/project/create')) {
    let forced = false
    if(usp.get('forced')!==null) forced = true
    require('./project/create')(
      inPath('/project/create'), 
      Res,
      forced
    )
  }else if(pathStW('/project/list')) {
    require('./project/list')(Res)
  }else if(pathStW('/project/remove')) {
    require('./project/remove')(
      inPath('/project/remove'), 
      Res
    )
  }else {
    Res.writeHead(404, {
      'content-type': 'text/plain'
    })
    Res.end('Unavailable API')
  }
}

module.exports = api
