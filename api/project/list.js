const fs = require('fs');
const path = require('path');

const dataDir = '../data'

function getList(Res) {
  const nameList = fs.readdirSync(
    path.join(__dirname, dataDir)
  )
  let list = []
  let readyNumber = nameList.length
  nameList.forEach((proj)=>{
    fs.readFile(
      path.join(__dirname, dataDir, proj, 'index.json'),
      (err, data)=>{
        if(err) {
          console.error(err.message);
        }else {
          try {
            list.push(
              JSON.parse(
                data.toString('utf8')
              )
            )
          }catch (err){
            console.error(err);
          }
        }
        readyNumber --
        if(readyNumber===0) {
          // relist by last modification
          list = list.sort((a,b)=>
            b.last_modification - a.last_modification
          )
          Res.writeHead(200, {
            'content-type': 'application/json; charset=utf8'
          })
          Res.end(JSON.stringify(list))
        }
      }
    )
  })
}

module.exports = getList
