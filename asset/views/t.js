function get(url, callback) {
  let xhr = new XMLHttpRequest()
  xhr.open('get', url)
  xhr.send()
  xhr.onreadystatechange = ()=>{
    if(xhr.readyState===4) {
      callback(xhr.response, xhr.status)
    }
  }
}


