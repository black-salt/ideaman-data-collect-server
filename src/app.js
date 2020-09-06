const Koa = require('koa')
const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const logger = require('./common/logger').log
const appConfig = require('./config').app
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

// 创建一个 Koa 服务实例
const app = new Koa()
// 创建一个路由的实例
const router = new Router()

// // 创建一个数据库实例，这里用 lowdb 的 JSON 存储来模拟数据库而已
// const adapter = new FileSync(path.resolve(__dirname, './db.json'))
// const db = low(adapter)
// // 初始化数据库，可以看做是数据库的字段定义
// db.defaults({ collect_data: [] }).write()

// 当有请求进来，路由中间件的异步回调会被执行
router.get('/', async (ctx, next) => {
  //  获取ip: 可通过该网站 'http://ip-api.com/json'获取

  const ip = ctx.header['x-real-ip'] || ''
  const userAgent = ctx.header['user-agent'] || ''
  const authorization = ctx.header['authorization'] || ''
  const ideamanToken = ctx.header['authorization'] || ''

  // 下面这两种看使用哪种方式
  // const { headers, data } = ctx.query
  // const { data } = ctx.request.body
  // const { userId } = data

  // 更新数据库
  // db.get('collect_data').push({ headers: { ip, userAgent, authorization, ideamanToken }, data: {} }).write()
  // db.update('headers', { ip, userAgent, authorization, ideamanToken }).write()
  // db.update('data', data).write()

  const logData = {
    headers: ctx.header,
    data: {}
  }

  const logStr = JSON.stringify(logData)

  // 输出到文件当中
  logger.info(`${logStr}`)

  // 数据收集成功后的返回体
  ctx.body = { success: 1, message: "数据收集成功" }
})


const port = appConfig.port
// 把中间件压入队列，等待执行
app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port)

console.info('\n IdeaMan埋点数据收集服务器running at: http://localhost:%d \n', port);
