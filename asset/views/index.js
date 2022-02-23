const fs = require('fs');
const path = require('path');

const read = (filename)=> {
  try {
    return fs.readFileSync(
      path.join(__dirname, filename)
    ).toString('utf8')
  }catch {
    return ''
  }
}

const getView = (filename)=>{
  const langStr = 'en'
  let html = read(`${filename}.html`)
  if(html==='') return ''
  const langSrc = JSON.parse(
    read(`lang/${langStr}.json`)
  )
  let lang = {}
  if(filename.indexOf('/')===0) {
    const langPath = filename.replace('/', '').replace(/\//g, '.')
    try {
      lang = new Function('filename' ,`return filename.${langPath}`)(langSrc)
      if(!lang) throw new Error()
    }catch {
      return html
    }
  }else {
    lang = langSrc[filename]
    if(!lang) return html
  }
  
  html = html.replace(// languege
    new RegExp(`{{ Lang }}`, 'g'),
    langStr
  )
  Object.keys(lang).forEach((key)=>{
    html = html.replace(
      new RegExp(`{{ ${key} }}`, 'g'),
      lang[key]
    )
  })
  return html
}

module.exports = {
  getView: getView,
  mimes: require('./mime')
}
