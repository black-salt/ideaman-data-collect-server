/**
 * app config
 */
const app = {
  port: 7000
}

/**
 * logger config
 */
const log4js = {
  // appenders是对各种日志输出形式的定义
  appenders: {
    out: {
      type: 'stdout',
      layout: { type: 'basic' }
    },
    file: {
      type: 'file',
      pattern: 'yyyy-MM-dd.log',    // 通过日期来生成文件
      alwaysIncludePattern: true,   // 文件名始终以日期区分
      filename: 'logs/IdeaManDCP',  // 最终文件名是上面的 pattern 拼接到 filename 后
      maxLogSize: 10485760,         // 10M
      backups: 3,
      compress: true,
      layout: {
        type: 'pattern',
        pattern: '[%d{yyyy-MM-dd hh:mm:ss}] %p %c - %m%n'
      }
    }
  },
  // categories决定了在某种类型输出下调用哪些的 appender
  categories: {
    default: {
      appenders: ['file'],
      level: 'info'
    }
  }
};

module.exports = {
  log4js,
  app
}
