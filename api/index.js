const fs = require('fs')
const path = require('path')

function api(url, Res) {
  url = new URL(url, 'http://0.0.0.0')
  let pathname = url.pathname.replace('/api', '')

  const pathStW = (stWName)=>{
    return pathname.indexOf(stWName)===0
  }

  const usp = url.searchParams
  const inPath = (name)=> {
    return decodeURIComponent(pathname.replace(name, ''))
  }

  if(pathStW('/project/checkName')) {
    require('./project/checkName')(
      inPath('/project/checkName'), 
      Res
    )
  }else if(pathStW('/project/create')) {
    require('./project/create') (usp, Res)
  }
}

module.exports = api
