## 依赖包相关介绍
### express-generator-typescript
express架构ts版本模板
https://github.com/seanpmaxwell/express-generator-typescript#readme
包含了代码模板，一系列可用的依赖工具包等

### ts-node
是可以直接执行ts文件，而不需要通过webpack在编译为js去运行
基本的原理可见：https://www.shouxicto.com/article/2740.html
大白话是：在编译ts文件前，通过node提供的机制将其转换为js
但存在一个问题，无法直接使用 tsconfig.json 的别名设定的引用（https://www.jianshu.com/p/cbd3bcdbb60b）

### tsconfig-paths
解决ts-node在执行ts文件时，A文件通过别名引用的方式，引用了B文件
``ts-node -r tsconfig-paths/register index.ts --files``
别名配置在 tsconfig.json # paths 中

### npx 
能主动去索引是否存在需要执行的包或者脚本，如果没有，主动下载；并且一次性下载最新的并且执行

### module-alias
提供了在node环境下的路径别名功能。一般前端开发可能会比较熟悉webpack的alias配置、typescript的paths配置等，
这些都是提供了路径别名的功能。路径别名在代码开发过程中是yyds，不然你看到这种../../../../xx路径时，是肯定会抓狂的
使用webpack打包的项目webpack本身会处理源代码中路径别名的配置到打包后代码的转换过程，但是如果单纯使用typescript进行编译的项目，虽然typescript在编译过程中可以正常处理paths中路径别名的配置，但是并不会改变打包后的代码，造成在打包后的代码中仍然存在路径别名配置
也就是通过前端中只需要在 tsconfig.json 中配置path，在实际的打包后也能正常访问
但是经过tsc变化后的ts代码，由于仍然存在 @符号，在node中运行时就因为无法识别路径导致异常
这就是 module-alias 存在的目的
在package.json中新增 _moduleAliases 进行路径配置（打包后的路径，在此工程中是 ./dist ）
详细见：
```node -r module-alias/register ./dist --env=production```
`-r module-alias/register` 表示注册模块别名 
`./dist` 运行路径  已经在 moduleAliases 配置了路径别名对应的映射关系
比如：`"@services": "dist/services"`

### jasmine
一个命令行工具，https://www.npmjs.com/package/jasmine 运行node环境下的 Jasmine(https://github.com/jasmine/jasmine) specs 

### fs-extra 
替代fs操作文件系统的方法 https://www.npmjs.com/package/fs-extra

### find
找文件，文件夹等 https://www.npmjs.com/package/find

### command-line-args
（node执行某个文件的命令行参数）解析命令行的值，另有他用 https://www.npmjs.com/package/command-line-args
比如在 pre-start中  `node -r module-alias/register ./dist --env=production`
```
配置了 --env 解析出来后 options.env = production, 如没有配置--env参数，则是默认值 development
const options = commandLineArgs([
  {
    name: 'env',
    alias: 'e',
    defaultValue: 'development', --如果么有这个参数的默认值
    type: String,
  },
]);
```

### dotenv
将 .env 文件中配置的 `环境变量` 添加到 `process.env` 中，通常是为了在启动之前设置环境变量的，在此工程中，可以参考 pre-start.ts

### express-async-errors
在express中支持  async functions
```
const express = require('express');
// 在use调用前引入即可
require('express-async-errors');
const User = require('./models/user');
const app = express();
 
// 这里就能使用 async,await语法糖
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});
```

### helmet
Helmet helps you secure your Express apps by setting various HTTP headers.
具体有比较多的安全header的设置看这个
https://juejin.cn/post/6844903702935896077
```
// 默认的设置
Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Origin-Agent-Cluster: ?1
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-XSS-Protection: 0
```

### jet-logger
Jet-Logger is an easy to configure logging tool that allows you change settings via the environment variables (recommended) or manually in code
可以通过命令行参数配置的方式来控制log的一种工具（相当于一个日志管理类，还可存在文件中）
JET_LOGGER_MODE: can be 'CONSOLE'(default), 'FILE', 'CUSTOM', and 'OFF'.
JET_LOGGER_FILEPATH: the file-path for file mode. Default is _home_dir/jet-logger.log_.
JET_LOGGER_FILEPATH_DATETIME: prepend the log file name with the datetime. Can be 'TRUE' (default) or 'FALSE'.
JET_LOGGER_TIMESTAMP: adds a timestamp next to each log. Can be 'TRUE' (default) or 'FALSE'.
JET_LOGGER_FORMAT: formats log as a line or JSON object. Can be 'LINE' (default) or 'JSON'.
在此工程中，可以参考 `development.env` 和 `production.env` 中jet-logger的配置

### jsonfile
Writing JSON.stringify() and then fs.writeFile() and JSON.parse() with fs.readFile() enclosed in try/catch blocks became annoying.
json文件的读，写工具类；支持promise和sync模式
https://www.npmjs.com/package/jsonfile

### jsonwebtoken
header.payload.signature 三个组成的字符串（不需要在服务端保存用户的认证信息，区别于传统的session）
详情可见分析：https://blog.csdn.net/weixin_43527871/article/details/123120835
具体的使用：https://www.npmjs.com/package/jsonwebtoken

### bcrypt
单向hash加密的工具，用于加密密码，存储在db，通过salt 来控制次数，越大越安全。支持同步和异步
```ts
    bcrypt.hash(pwd, saltRounds);
    bcrypt.hashSync(pwd, saltRounds);
    bcrypt.compare(pwd, hash);
```

### morgan
https://www.npmjs.com/package/morgan
HTTP request logger middleware for node.js

### nodemon 
自动监听node的文件变化，重启
常见的配置方式：https://juejin.cn/post/6844904191316459527
1. 命令行配置
```
    nodemon -e ts,js,json ./dist/bin/www.js
    监听对应后缀名的变化（ts,js,json）
    运行 ./dist/bin/www.js 文件
```
2. package.json 配置
```
"nodemonConfig": {
    "watch": [  // 监听的目录
      "src"
    ],
    "ext": "ts, html",  // 后缀名
    "ignore": [ // 忽略的问题
      "src/public"
    ],  // 执行的脚本（在此是直接通过ts-node运行 ./src/index.ts 入口文件）
    "exec": "./node_modules/.bin/ts-node --files -r tsconfig-paths/register ./src"
  }
```
3. 通过nodemon.json 外部文件配置
```nodemon --config ./spec/nodemon.json```