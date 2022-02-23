const fs = require('fs')
const path = require('path')

const dataDir = '../data'

module.exports = (name, Res)=>{
  require('./checkName')(name, null, 
    result=>callback(result)
  )

  function callback(nameStatus) {
    if(nameStatus!==0) {
      Res.end('Do nothing')
    }else {
      let rmCount = 0
      function rmDir(dirpath) {
        fs.readdir(dirpath, (err, files)=>{
          if(err) {
            console.error(err.message);
          }else {
            files.forEach((file)=>{
              const filepath = path.join(dirpath, file)
              fs.stat(
                filepath,
                (err, stats)=>{
                  if(err) {
                    console.error(err.message);
                  }else {
                    if(stats.isDirectory()) {
                      rmDir(file)
                    }else {
                      fs.unlink(filepath, (err)=>{
                        if(err) {
                          console.error(err.message);
                        }else {
                          rmCount ++
                        }
                      })
                    }
                  }
                }
              )
            })
          }
        })
      }
      rmDir(path.join(__dirname, dataDir, name))
    }
  }
}
