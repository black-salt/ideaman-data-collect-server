# IdeaMan 埋点数据收集服务器

## 程序启动
> 程序启动
> node index.js

## 埋点数据请求发送方式

1. 可以从浏览器通过 get 请求： [http://localhost:7000/?distinct_id=a&user_id=1&recommend_scene_id=123&action=click](http://localhost:7000/?user=a&page=1&action=click) 来访问

2. *也可发送 post 请求(使用 CORS 时设置 Access-Control-Allow-Max-Age)

## 数据收集

请求几次后，可发现数据已存入，在 index.js 的同目录，有一个 db.json，里面的数据大概如下：

> 数据字段规范基本遵循 [《石墨文档-字段规范》](https://shimo.im/docs/YCpwxxTkGcdQTgHj)

``` json
{
  "headers": {
      "ip": "",
      "user": "a",
      "page": "1",
      "action": "click"
    },
  "data": {
    "distinct_id": "2b0a6f51a3cd6775", // 这次事件的唯一标识符，用于确定此次事件
    "user_id": "ad51z3xc1561f2ac", // 这次事件的唯一标识符，用于确定此次事件
    "recommend_scene_id": "", // 推荐场景id，主要体现推荐位
    "bucket_id": "051a3ca6fd62b775", // 用来支持AB实验的，可以代表该物料被分到哪个实验桶中
    "strategy_id": "60bf72dca6a75135", // 用来区分表示该物料是哪种策略下被推荐出
    "timestamp": 1434556935000, // 上报时间戳
    "event_type": "Track", // 用来表示事件的类型，这里是追踪，应该填入追踪事件定义的事件id，但由于目前还未确定是否固定事件类型，因此暂时全部使用字符串代替
    "event": "$ItemView", // 事件
    "project": "project1",
    "properties": { // 对应事件需要传递的字段
      "page_name": "12346物料详情", // 主要根据浏览器 window.document.title, 后续做具体规定
      "url": "www.demo.com",
      "referer": "www.referer.com", // 从哪里跳转过来的
      "page_id": "/product/123465", // 暂定页面路径
      "page_path": "/product/123465", // 页面路径
      
      "product_id": 12345, // 当前该物料的唯一标识符
      "product_name": "物料1", // 当前该物料的唯一标识符
      "product_classify": "物料类型1", // 当前该物料的所属类型
      "product_price": 14.0, // 当前该物料的唯一标识符
    }，
    "system": {
      "$ip": "192.168.0.1",
      "$app_version": "1.3", // 建议在window对象下注册全局变量 app_version，方便日后调试
      "$wifi": 1, 
      "$province": "辽宁",
      "$city": "沈阳",    
      "$user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/58.0.3029.113 Mobile/14F89 Safari/602.1",
      "$screen_width": 320, // 从window对象获取
      "$screen_height": 640, // 从window对象获取
    },
    "extra_para":{
      // (扩展参数结构体)：如果各业务有新的需求，需要透传新的参数，来实现新的需求，都会加到这个扩展参数字段中；如果推荐端有部分字段需要加入到数据分析的地方，当前端请求推荐接口时，推荐接口会给出完整的extra_para结构体数据，前端只要原样上报
    }
  }
}
```
