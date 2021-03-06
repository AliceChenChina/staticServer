
const http = require('http')
const fs = require('fs')
const url = require('url')
const port = process.argv[2]
if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

const server = http.createServer(function(request, response){
  const parsedUrl = url.parse(request.url, true)
  const pathWithQuery = request.url
  let queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  const path = parsedUrl.pathname
  const query = parsedUrl.query
  const method = request.method

  /******** 从这里开始看，上面不要看 ************/
    response.statusCode = 200;
    let filePath = path === '/' ? 'index.html' : path;
    const index = filePath.lastIndexOf('.');
    const suffix = filePath.substring(index);
    const fileTypes = {
      '.html': 'text/html',
      '.css':'text/css',
      '.js':'text/javascript'
    }
  response.setHeader('Content-Type', `${fileTypes[suffix] || 'text/html'}; charset=utf-8`);
    let content;
    try {
      content = fs.readFileSync(`public/${filePath}`)
    }catch(e){
      response.statusCode = 200;
      content = '文件不存在';
    }
    response.write(content)
    response.end()
  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
