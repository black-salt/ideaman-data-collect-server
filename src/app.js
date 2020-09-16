const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser');
const fs = require('fs')
const Router = require('koa-router')
const logger = require('./common/logger').log
const appConfig = require('./config').app

// 创建一个 Koa 服务实例
const app = new Koa()

// 使用 bodyParser 解析 post 传送的数据
app.use(bodyParser())

// 创建一个路由的实例
const router = new Router()

// 获取ip: 可通过该网站 'http://ip-api.com/json'获取

// 当有 POST 请求进来，路由中间件的异步回调会被执行
// POST 请求的 content-type 需要为 application/x-www-form-urlencoded"
router.options('/collect/event', async (ctx, next) => {
  console.info("OPTIONS: /collect/event")

  ctx.set('Access-Control-Allow-Origin', '*'); //允许来自所有域名请求(不携带cookie请求可以用*，如果有携带cookie请求必须指定域名)
  ctx.set('Access-Control-Allow-Methods', 'HEAD, OPTIONS, GET, PUT, POST, DELETE'); // 设置所允许的HTTP请求方法
  ctx.set('Access-Control-Allow-Headers', 'X-Device-Id, X-Source-Url, X-Current-Url, x-user-id, X-User-Id, accept, origin, content-type'); // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
  ctx.set('Access-Control-Max-Age', 3000); // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
  // 数据收集成功后的返回体
  ctx.body = { success: 1, message: "数据收集成功" }
})

router.post('/collect/event', async (ctx, next) => {
  console.info("/collect/event")

  ctx.set('Access-Control-Allow-Origin', '*'); //允许来自所有域名请求(不携带cookie请求可以用*，如果有携带cookie请求必须指定域名)
  ctx.set('Access-Control-Allow-Methods', 'HEAD, OPTIONS, GET, PUT, POST, DELETE'); // 设置所允许的HTTP请求方法
  // ctx.set('Access-Control-Allow-Headers', 'X-Device-Id, X-Source-Url, X-Current-Url, x-user-id, X-User-Id, accept, origin, content-type'); // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
  ctx.set('Access-Control-Allow-Headers', 'accept, origin, content-type'); // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
  ctx.set('Access-Control-Max-Age', 3000); // 该字段可选，用来指定本次预检请求的有效期，单位为秒。

  const ip = ctx.header['x-real-ip'] || ''
  const userAgent = ctx.header['user-agent'] || ''
  const authorization = ctx.header['authorization'] || ''
  const ideamanToken = ctx.header['authorization'] || ''

  const data = ctx.request.body ? ctx.request.body : {}

  // 组装埋点数据和请求头数据
  const logData = {
    headers: ctx.header,
    data: JSON.parse(data.data)
  }

  // 将埋点数据序列化
  const logStr = JSON.stringify(logData)

  // 输出到文件当中
  logger.info(`${logStr}`)

  // 数据收集成功后的返回体
  ctx.body = { success: 1, message: "数据收集成功" }
})

router.get('/collect/isupload', async (ctx, next) => {
  console.log("/collect/isupload")
  ctx.set('Access-Control-Allow-Origin', '*'); //允许来自所有域名请求(不携带cookie请求可以用*，如果有携带cookie请求必须指定域名)
  ctx.set('Access-Control-Allow-Methods', 'HEAD, OPTIONS, GET, PUT, POST, DELETE'); // 设置所允许的HTTP请求方法
  ctx.set('Access-Control-Allow-Headers', 'x-user-id, accept, origin, content-type'); // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
  ctx.set('Access-Control-Max-Age', 3000); // 该字段可选，用来指定本次预检请求的有效期，单位为秒。

  // 数据收集成功后的返回体
  ctx.body = { success: 1, message: "允许埋点收集数据" }
})

router.get('/collect/device', async (ctx, next) => {
  console.log("/collect/device")
  // 数据收集成功后的返回体
  ctx.body = { success: 1, message: "设备数据收集成功" }
})

router.get('/iframe', async (ctx, next) => {
  console.log("/iframe")
  // 数据收集成功后的返回体
  ctx.body = { success: 1, message: "模拟iframe跨域接口" }
})


const port = appConfig.port

// 把中间件压入队列，等待执行
app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port)

console.info('\n IdeaMan埋点数据收集服务器running at: http://localhost:%d \n', port);
