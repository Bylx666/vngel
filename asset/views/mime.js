const mimes = {
  js: "application/javascript",
  svg: "image/svg+xml",
  html: "text/html; charset=utf8",
  json: "application/json; charset=utf8",
  css: "text/css",
  jpg: "image/jpeg",
  png: "image/png"
}

module.exports = {
  mimes: mimes,
  get: (fullName)=>{
    let finalMime = 'text/plain'
    Object.keys(mimes).forEach((suffix)=>{
      if(fullName.endsWith('.'+suffix)) {
        finalMime = mimes[suffix]
        return
      }
    })
    return finalMime
  }
}
