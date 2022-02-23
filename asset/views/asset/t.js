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

let windowCache = []
function jump(dest) {
  const SRC = dest.split('/')[dest.split('/').length - 2]
  const headerDom = document.getElementById('header_')
  const navListDom = document.getElementById('navList_')
  Array.from(
    navListDom.children, (el)=>{
      el.classList.remove('focused')
    }
  );
  document.getElementById(`nav_${SRC}_`).classList.add('focused')
  if(dest.endsWith('/i')&&dest.split('/').length===2) {
    headerDom.style.display = 'none'
  }else {
    const backDom = headerDom.getElementsByClassName('back')[0]
    backDom.onclick = ()=>{
      jump(/.+\//.exec(dest)[0]+'i')
    }
    backDom.getElementsByTagName('span')[0].textContent = SRC
    headerDom.style.display = null
  }

  const ctt = document.getElementById('content_')
  const sty = document.getElementById('activeStyle_')

  let cached = false
  windowCache.forEach((windose)=>{
    windose.dom.style.display = 'none'
    if(windose.dest===dest) {
      cached = true
      sty.textContent = windose.style
      windose.dom.style.display = null
    }
  })
  if(cached) return

  const domObj = new (function(dest) {
    this.dest = dest
    this.dom = document.createElement('div')
    this.style = ''
    this.remove = ()=> {
      windowCache.splice(
        windowCache.indexOf(this), 1
      )
      this.dom.remove()
      return true
    }
  })(dest)
  windowCache.push(domObj)

  get('./pages/'+dest, (result)=>{
    domObj.dom.insertAdjacentHTML('afterbegin', result)
    ctt.append(domObj.dom)
    Array.from(domObj.dom.getElementsByTagName('script'), (script)=>{
      new Function('_getId' ,script.textContent)(
        classAsId=>
        domObj.dom.getElementsByClassName(classAsId)[0]
      )
    })
    Array.from(domObj.dom.getElementsByTagName('style'), (style)=>{
      style.remove()
      domObj.style += style.textContent
    })
    sty.textContent = domObj.style
  })
}

function WindowLoad() {
  const pDom = document.getElementById('popup_')
  const loadingDom = pDom.getElementsByClassName('loading')[0]
  const messageDom = pDom.getElementsByClassName('message')[0]

  pDom.style.display = 'initial'
  loadingDom.style.display = 'initial'
  messageDom.style.display = 'none'
  let scrollDeg = 0
  function scrollIt() {
    scrollDeg += 90
    loadingDom.style.transform = 
      'translate(-50%,-50%) rotate('+scrollDeg.toString()+'deg)'
  }
  const scrollInterval = setInterval(scrollIt, 200)
  this.end = (message)=>{
    clearInterval(scrollInterval)
    if(message===null) {
      pDom.style.display = 'none'
    }else {
      loadingDom.style.display = 'none'
      loadingDom.style.transform =
       'translate(-50%,-50%) rotate(0deg)'
      messageDom.style.display = 'initial'
      messageDom.getElementsByTagName('span')[0].textContent = message
    }
  }
}
