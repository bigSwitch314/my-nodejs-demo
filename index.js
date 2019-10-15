const http = require('http')
const url = require('url')
const querystring = require('querystring')

const home = require('./pages/home.js')
const list = require('./pages/list.js')
const user = require('./pages/user.js')

const server = http.createServer((req, res) => {
  // 定义公共变量，存储请求方法、路径、数据
  const method = req.method
  let path = ''
  let param = {}

  //请求路径
  const parsed = url.parse(req.url)
  const pathname = parsed.pathname

  // 判断请求方法为GET还是POST，区分处理数据
  if (method === 'GET') {
    const { pathname, query } = url.parse(req.url, true)

    path = pathname
    param = query
  } else if (method === 'POST') {
    path = req.url
    let arr = []

    req.on('data', (buffer) => {
      arr.push(buffer)
    })

    req.on('end', () => {
      let buffer = Buffer.concat(arr)
      param = parseQueryStr(buffer.toString())
    })
  }

  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})

  const data = { method, param }

  if (path === '/' || pathname === '/home') {
    res.end(home + JSON.stringify(data))
    return
  }
  if (path === '/list') {
    res.end(list + JSON.stringify(data))
    return
  }
  if (path === '/user') {
    res.end(user + JSON.stringify(data))
    return
  }

  res.end(JSON.stringify('404------没有匹配到路由'))
})

server.listen(8080, () => console.log('listen on 8080'))
console.log('服务启动成功')