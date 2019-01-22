const http = require('http')
const fs = require('fs')
const path = require('path')
const querystring = require('querystring')
const urlModule = require('url')

http.createServer((req, res) =>
{
  // 允许跨域
  res.setHeader("Access-Control-Allow-Origin", "*")
  const { pathname: url, query } = urlModule.parse(req.url, true)
  // 把请求 方法 转换成小写
  req.method = req.method.toLowerCase()
  const pageindex = parseInt(query.pageindex)
  if (req.url === '/api/lunbotu' && req.method === 'get')
  {
    // 读取文件 处理 get 请求
    fs.readFile(path.join(__dirname, 'data', 'lunbotuList.json'), 'utf8', (err, data) =>
    {
      // ENOENT：没有这样的 文件或目录
      if (err && err.code !== 'ENOENT') { throw err }
      // 把读到的 lunbotuList.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      // 设置响应报文头 防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      // 结束响应， 把 lunbotuList.json 里的数据返回给前端
      res.end(arr)
    })
  }
  else if (req.url === '/api/newslist' && req.method === 'get')
  {
    fs.readFile(path.join(__dirname, 'data', 'newslist.json'), 'utf8', (err, data) =>
    {
      if (err && err.code !== 'ENOENT') { throw err }
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(arr)
    })
  }
  else if (url == '/api/newsinfo/1')
  {
    fs.readFile(path.join(__dirname, 'data', 'newsinfo1.json'), 'utf8', (err, data) =>
    {
      if (err && err.code !== 'ENOENT') { throw err }
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(arr)
    })
  }
  else if (url == '/api/newsinfo/2')
  {
    fs.readFile(path.join(__dirname, 'data', 'newsinfo2.json'), 'utf8', (err, data) =>
    {
      if (err && err.code !== 'ENOENT') { throw err }
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(arr)
    })
  }
  else if (url == '/api/newsinfo/3')
  {
    fs.readFile(path.join(__dirname, 'data', 'newsinfo3.json'), 'utf8', (err, data) =>
    {
      if (err && err.code !== 'ENOENT') { throw err }
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(arr)
    })
  }
  else if (url === '/api/newsinfo_comment/1' && pageindex === 1)
  {
    fs.readFile(path.join(__dirname, 'data', 'comment-newsinfo1-1.json'), 'utf8', (err, data) =>
    {
      if (err && err.code !== 'ENOENT') { throw err }
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(arr)
    })
  }
  else if (url === '/api/newsinfo_comment/1' && pageindex === 2)
  {
    fs.readFile(path.join(__dirname, 'data', 'comment-newsinfo1-2.json'), 'utf8', (err, data) =>
    {
      if (err && err.code !== 'ENOENT') { throw err }
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(arr)
    })
  }
  else if (url === '/api/newsinfo_comment/2' && pageindex === 1)
  {
    fs.readFile(path.join(__dirname, 'data', 'comment-newsinfo2-1.json'), 'utf8', (err, data) =>
    {
      if (err && err.code !== 'ENOENT') { throw err }
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(arr)
    })
  }
  else if (url === '/api/newsinfo_comment/2' && pageindex === 2)
  {
    fs.readFile(path.join(__dirname, 'data', 'comment-newsinfo2-2.json'), 'utf8', (err, data) =>
    {
      if (err && err.code !== 'ENOENT') { throw err }
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(arr)
    })
  }
  else if (url === '/api/newsinfo_comment/3' && pageindex === 1)
  {
    fs.readFile(path.join(__dirname, 'data', 'comment-newsinfo3-1.json'), 'utf8', (err, data) =>
    {
      if (err && err.code !== 'ENOENT') { throw err }
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(arr)
    })
  }
  else if (url === '/api/newsinfo_comment/3' && pageindex === 2)
  {
    fs.readFile(path.join(__dirname, 'data', 'comment-newsinfo3-2.json'), 'utf8', (err, data) =>
    {
      if (err && err.code !== 'ENOENT') { throw err }
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(arr)
    })
  }
  else if (url === '/api/post_newsinfo_comment/1')
  {
    // 处理是 post 请求
    fs.readFile(path.join(__dirname, 'data', 'comment-newsinfo1-1.json'), 'utf8', function (err, data)
    {
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      var list = JSON.parse(data || '[]')

      // 声明一个空数组保存 post 传过来的数据
      var array = []
      req.on('data', function (chunk)
      {
        // 监听 传输data 事件，把收集到的 post 数据都 push 到 array 数组中保存
        array.push(chunk)
      })
      req.on('end', function ()
      {
        // 把接收到的 post 数据 拼接成 完整 的 postBody
        var postBody = Buffer.concat(array)
        var postBodyString = postBody.toString('utf8')
        // 把传输的字符串 反序列化 成一个对象
        var postBodyJson = querystring.parse(postBodyString)
        // 获取 评论 内容
        var cont = postBodyJson.content
        // 拼接出一个 评论对象 
        var cmt = { user_name: '@正经人老赵￥', add_time: Date.now(), content: cont }
        // 把 评论对象 放到 list 里的 message 数组的 第一项
        list.message.unshift(cmt)
        // 把 list 重新写到 comment.json 里
        fs.writeFile(path.join(__dirname, 'data', 'comment-newsinfo1-1.json'), JSON.stringify(list), function (err)
        {
          if (err)
          {
            throw err
          }
          // 给 前端 反馈 写入成功
          res.end(JSON.stringify({ "status": 0 }))
        })
      })
    })
  }
  else if (req.url === '/api/post_newsinfo_comment_delete/1')
  {
    fs.readFile(path.join(__dirname, 'data', 'comment-newsinfo1-1.json'), 'utf8', function (err, data)
    {
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      var arr = JSON.parse(data || '[]')

      // 声明一个空数组保存 post 传过来的数据
      var array = []
      req.on('data', function (chunk)
      {
        // 监听 传输data 事件，把收集到的 post 数据都 push 到 array 数组中保存
        array.push(chunk)
      })
      req.on('end', function ()
      {
        // 把接收到的 post 数据 拼接成 完整 的 postBody
        var postBody = Buffer.concat(array)

        var postBodyString = postBody.toString('utf8')
        // 把传输的字符串 反序列化 成一个对象
        var postBodyJson = querystring.parse(postBodyString)
        // 获取 评论 内容
        var cont = postBodyJson.content
        console.log(cont)
        var newArr = arr.message.filter(function (item)
        {
          return item.add_time != cont
        })
        var newData = {
          "status": 0,
          "message": newArr
        }
        fs.writeFile(path.join(__dirname, 'data', 'comment-newsinfo1-1.json'), JSON.stringify(newData), function (err)
        {
          if (err)
          {
            throw err
          }
          // 给 前端 反馈 写入成功
          res.end()
        })
      })
    })
  }
  else if (url === '/api/post_newsinfo_comment/2')
  {
    // 处理是 post 请求
    fs.readFile(path.join(__dirname, 'data', 'comment-newsinfo2-1.json'), 'utf8', function (err, data)
    {
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      var list = JSON.parse(data || '[]')

      // 声明一个空数组保存 post 传过来的数据
      var array = []
      req.on('data', function (chunk)
      {
        // 监听 传输data 事件，把收集到的 post 数据都 push 到 array 数组中保存
        array.push(chunk)
      })
      req.on('end', function ()
      {
        // 把接收到的 post 数据 拼接成 完整 的 postBody
        var postBody = Buffer.concat(array)

        var postBodyString = postBody.toString('utf8')
        // 把传输的字符串 反序列化 成一个对象
        var postBodyJson = querystring.parse(postBodyString)
        // 获取 评论 内容
        var cont = postBodyJson.content
        // 拼接出一个 评论对象 
        var cmt = { user_name: '@正经人老赵￥', add_time: Date.now(), content: cont }
        // 把 评论对象 放到 list 里的 message 数组的 第一项
        list.message.unshift(cmt)
        // 把 list 重新写到 comment.json 里
        fs.writeFile(path.join(__dirname, 'data', 'comment-newsinfo2-1.json'), JSON.stringify(list), function (err)
        {
          if (err)
          {
            throw err
          }
          // 给 前端 反馈 写入成功
          res.end(JSON.stringify({ "status": 0 }))
        })
      })
    })
  }
  else if (req.url === '/api/post_newsinfo_comment_delete/2')
  {
    fs.readFile(path.join(__dirname, 'data', 'comment-newsinfo2-1.json'), 'utf8', function (err, data)
    {
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      var arr = JSON.parse(data || '[]')

      // 声明一个空数组保存 post 传过来的数据
      var array = []
      req.on('data', function (chunk)
      {
        // 监听 传输data 事件，把收集到的 post 数据都 push 到 array 数组中保存
        array.push(chunk)
      })
      req.on('end', function ()
      {
        // 把接收到的 post 数据 拼接成 完整 的 postBody
        var postBody = Buffer.concat(array)

        var postBodyString = postBody.toString('utf8')
        // 把传输的字符串 反序列化 成一个对象
        var postBodyJson = querystring.parse(postBodyString)
        // 获取 评论 内容
        var cont = postBodyJson.content
        console.log(cont)
        var newArr = arr.message.filter(function (item)
        {
          return item.add_time != cont
        })
        var newData = {
          "status": 0,
          "message": newArr
        }
        fs.writeFile(path.join(__dirname, 'data', 'comment-newsinfo2-1.json'), JSON.stringify(newData), function (err)
        {
          if (err)
          {
            throw err
          }
          // 给 前端 反馈 写入成功
          res.end()
        })
      })
    })
  }
  else if (url === '/api/photocate' && req.method === 'get')
  {
    fs.readFile(path.join(__dirname, 'data', 'photo-cates.json'), 'utf8', (err, data) =>
    {
      if (err && err.code !== 'ENOENT') { throw err }
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(arr)
    })
  }
  else if (url === '/api/photolist/0' && req.method === 'get')
  {
    fs.readFile(path.join(__dirname, 'data', 'all-photo-cates.json'), 'utf8', (err, data) =>
    {
      if (err && err.code !== 'ENOENT') { throw err }
      var arr = JSON.parse(JSON.stringify(data || '[]'))

      // 设置响应报文头 防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')

      // 结束响应， 把 lunbotuList.json 里的数据返回给前端
      res.end(arr)
    })
  }
  else if (url === '/api/photolist/1' && req.method === 'get')
  {
    fs.readFile(path.join(__dirname, 'data', 'zhi-photo-cates.json'), 'utf8', (err, data) =>
    {
      if (err && err.code !== 'ENOENT') { throw err }
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(arr)
    })
  }
  else if (url === '/api/photolist/2' && req.method === 'get')
  {
    fs.readFile(path.join(__dirname, 'data', 'zizhi-photo-cates.json'), 'utf8', (err, data) =>
    {
      if (err && err.code !== 'ENOENT') { throw err }
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(arr)
    })
  }
  else if (url === '/api/photolist/3' && req.method === 'get')
  {
    // 读取文件 处理 get 请求
    fs.readFile(path.join(__dirname, 'data', 'gou-photo-cates.json'), 'utf8', (err, data) =>
    {
      // ENOENT：没有这样的 文件或目录
      if (err && err.code !== 'ENOENT') { throw err }

      // 把读到的 lunbotuList.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))

      // 设置响应报文头 防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')

      // 结束响应， 把 lunbotuList.json 里的数据返回给前端
      res.end(arr)
    })
  }
  else if (url === '/api/photoinfo/1' && req.method === 'get')
  {
    // 读取文件 处理 get 请求
    fs.readFile(path.join(__dirname, 'data', 'photoinfo.json'), 'utf8', (err, data) =>
    {
      // ENOENT：没有这样的 文件或目录
      if (err && err.code !== 'ENOENT') { throw err }

      // 把读到的 lunbotuList.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))

      // 设置响应报文头 防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')

      // 结束响应， 把 lunbotuList.json 里的数据返回给前端
      res.end(arr)
    })
  }
  else if (url === '/api/photothumbs/1' && req.method === 'get')
  {
    // 读取文件 处理 get 请求
    fs.readFile(path.join(__dirname, 'data', 'photo-slide.json'), 'utf8', (err, data) =>
    {
      // ENOENT：没有这样的 文件或目录
      if (err && err.code !== 'ENOENT') { throw err }

      // 把读到的 lunbotuList.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))

      // 设置响应报文头 防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')

      // 结束响应， 把 lunbotuList.json 里的数据返回给前端
      res.end(arr)
    })
  }

  else if (url === '/api/getgoodslunbotu/1')
  {
    fs.readFile(path.join(__dirname, 'data', 'goodsinfolunbotu.json'), 'utf8', function (err, data)
    {
      // ENOENT：没有这样的文件或目录
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      // 把读取到的 comment.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      // 设置报文头防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      // console.log('返回数据成功！')
      // 结束响应 把 comment 数据返回给 前端
      console.log('返回成功')
      res.end(arr)
    })
  }

  else if (url === '/api/getgoods' && pageindex === 1 && req.method === 'get')
  {
    // console.log('ok')
    // 处理 get 请求
    fs.readFile(path.join(__dirname, 'data', 'goodslist.json'), 'utf8', function (err, data)
    {
      // ENOENT：没有这样的文件或目录
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      // 把读取到的 comment.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      // 设置报文头防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      // console.log('返回数据成功！')
      // 结束响应 把 comment 数据返回给 前端
      res.end(arr)
    })
  } else if (url === '/api/getgoods' && pageindex === 2 && req.method === 'get')
  {
    fs.readFile(path.join(__dirname, 'data', 'goodslist2.json'), 'utf8', function (err, data)
    {
      // ENOENT：没有这样的文件或目录
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      // 把读取到的 comment.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      // 设置报文头防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      // console.log('返回数据成功！')
      // 结束响应 把 comment 数据返回给 前端
      res.end(arr)
    })
  } else if (url === '/api/goods/getinfo/1' && req.method === 'get')
  {
    fs.readFile(path.join(__dirname, 'data', 'goodsinfo1.json'), 'utf8', function (err, data)
    {
      // ENOENT：没有这样的文件或目录
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      // 把读取到的 comment.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      // 设置报文头防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      // console.log('返回数据成功！')
      // 结束响应 把 comment 数据返回给 前端
      res.end(arr)
    })
  } else if (url === '/api/goods/getinfo/2' && req.method === 'get')
  {
    fs.readFile(path.join(__dirname, 'data', 'goodsinfo2.json'), 'utf8', function (err, data)
    {
      // ENOENT：没有这样的文件或目录
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      // 把读取到的 comment.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      // 设置报文头防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      // console.log('返回数据成功！')
      // 结束响应 把 comment 数据返回给 前端
      res.end(arr)
    })
  }
  else if (url === '/api/goods/getinfo/3' && req.method === 'get')
  {
    fs.readFile(path.join(__dirname, 'data', 'goodsinfo3.json'), 'utf8', function (err, data)
    {
      // ENOENT：没有这样的文件或目录
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      // 把读取到的 comment.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      // 设置报文头防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      // console.log('返回数据成功！')
      // 结束响应 把 comment 数据返回给 前端
      res.end(arr)
    })
  }
  else if (url === '/api/goods/getinfo/4' && req.method === 'get')
  {
    fs.readFile(path.join(__dirname, 'data', 'goodsinfo4.json'), 'utf8', function (err, data)
    {
      // ENOENT：没有这样的文件或目录
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      // 把读取到的 comment.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      // 设置报文头防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      // console.log('返回数据成功！')
      // 结束响应 把 comment 数据返回给 前端
      res.end(arr)
    })
  }
  else if (url === '/api/goods/getinfo/5' && req.method === 'get')
  {
    fs.readFile(path.join(__dirname, 'data', 'goodsinfo5.json'), 'utf8', function (err, data)
    {
      // ENOENT：没有这样的文件或目录
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      // 把读取到的 comment.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      // 设置报文头防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      // console.log('返回数据成功！')
      // 结束响应 把 comment 数据返回给 前端
      res.end(arr)
    })
  }
  else if (url === '/api/goods/getshopcarlist/1' && req.method === 'get')
  {
    fs.readFile(path.join(__dirname, 'data', 'shopcarlist1.json'), 'utf8', function (err, data)
    {
      // ENOENT：没有这样的文件或目录
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      // 把读取到的 comment.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      // 设置报文头防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      // console.log('返回数据成功！')
      // 结束响应 把 comment 数据返回给 前端
      res.end(arr)
    })
  }
  else if (url === '/api/goods/getshopcarlist/2' && req.method === 'get')
  {
    fs.readFile(path.join(__dirname, 'data', 'shopcarlist2.json'), 'utf8', function (err, data)
    {
      // ENOENT：没有这样的文件或目录
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      // 把读取到的 comment.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      // 设置报文头防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      // console.log('返回数据成功！')
      // 结束响应 把 comment 数据返回给 前端
      res.end(arr)
    })
  }
  else if (url === '/api/goods/getshopcarlist/3' && req.method === 'get')
  {
    fs.readFile(path.join(__dirname, 'data', 'shopcarlist3.json'), 'utf8', function (err, data)
    {
      // ENOENT：没有这样的文件或目录
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      // 把读取到的 comment.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      // 设置报文头防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      // console.log('返回数据成功！')
      // 结束响应 把 comment 数据返回给 前端
      res.end(arr)
    })
  }
  else if (url === '/api/goods/getshopcarlist/4' && req.method === 'get')
  {
    fs.readFile(path.join(__dirname, 'data', 'shopcarlist4.json'), 'utf8', function (err, data)
    {
      // ENOENT：没有这样的文件或目录
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      // 把读取到的 comment.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      // 设置报文头防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      // console.log('返回数据成功！')
      // 结束响应 把 comment 数据返回给 前端
      res.end(arr)
    })
  }
  else if (url === '/api/goods/getshopcarlist/5' && req.method === 'get')
  {
    fs.readFile(path.join(__dirname, 'data', 'shopcarlist5.json'), 'utf8', function (err, data)
    {
      // ENOENT：没有这样的文件或目录
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      // 把读取到的 comment.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      // 设置报文头防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      // console.log('返回数据成功！')
      // 结束响应 把 comment 数据返回给 前端
      res.end(arr)
    })
  }
  else if (url === '/api/goods/getshopcarlist/1,2' || url === '/api/goods/getshopcarlist/2,1' && req.method === 'get')
  {
    fs.readFile(path.join(__dirname, 'data', 'shopcarlist12.json'), 'utf8', function (err, data)
    {
      // ENOENT：没有这样的文件或目录
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      // 把读取到的 comment.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      // 设置报文头防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      // console.log('返回数据成功！')
      // 结束响应 把 comment 数据返回给 前端
      res.end(arr)
    })
  }
  else if (url === '/api/goods/getshopcarlist/1,3' || url === '/api/goods/getshopcarlist/3,1' && req.method === 'get')
  {
    fs.readFile(path.join(__dirname, 'data', 'shopcarlist13.json'), 'utf8', function (err, data)
    {
      // ENOENT：没有这样的文件或目录
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      // 把读取到的 comment.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      // 设置报文头防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      // console.log('返回数据成功！')
      // 结束响应 把 comment 数据返回给 前端
      res.end(arr)
    })
  }
  else if (url === '/api/goods/getshopcarlist/3,2' || url === '/api/goods/getshopcarlist/2,3' && req.method === 'get')
  {
    fs.readFile(path.join(__dirname, 'data', 'shopcarlist23.json'), 'utf8', function (err, data)
    {
      // ENOENT：没有这样的文件或目录
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      // 把读取到的 comment.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      // 设置报文头防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      // console.log('返回数据成功！')
      // 结束响应 把 comment 数据返回给 前端
      res.end(arr)
    })
  }
  else if (url === '/api/goods/getshopcarlist/1,2,3' || url === '/api/goods/getshopcarlist/1,3,2' || url === '/api/goods/getshopcarlist/2,1,3' || url === '/api/goods/getshopcarlist/2,3,1' || url === '/api/goods/getshopcarlist/3,1,2' || url === '/api/goods/getshopcarlist/3,2,1' && req.method === 'get')
  {
    fs.readFile(path.join(__dirname, 'data', 'shopcarlist123.json'), 'utf8', function (err, data)
    {
      // ENOENT：没有这样的文件或目录
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      // 把读取到的 comment.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      // 设置报文头防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      // console.log('返回数据成功！')
      // 结束响应 把 comment 数据返回给 前端
      res.end(arr)
    })
  }

  else if (url === '/api/getvideos')
  {
    fs.readFile(path.join(__dirname, 'data', 'video.json'), 'utf8', function (err, data)
    {
      // ENOENT：没有这样的文件或目录
      if (err && err.code !== 'ENOENT')
      {
        throw err
      }
      // 把读取到的 comment.json 转换成可操作的 JS 对象
      var arr = JSON.parse(JSON.stringify(data || '[]'))
      // 设置报文头防止乱码
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      // console.log('返回数据成功！')
      // 结束响应 把 comment 数据返回给 前端
      res.end(arr)
    })
  }


  else
  {
    res.end('404')
  }
}).listen(3002, () =>
{
  console.log('http://127.0.0.1:3002')
})