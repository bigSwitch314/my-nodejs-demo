const http = require('http')

const home = require('./pages/home.js')
const list = require('./pages/list.js')
const user = require('./pages/user.js')

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    if (req.url === '/' || req.url === '/home') {
        res.end(home)
        return
    }
    if (req.url === '/list') {
        res.end(list)
        return
    }
    if (req.url === '/user') {
        res.end(user)
        return
    }

    res.end(JSON.stringify('404------没有匹配到路由'))
})

server.listen(8080, () => console.log('listen on 8080'))