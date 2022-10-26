## 依赖包相关介绍
### express-generator-typescript
express架构ts版本模板
https://github.com/seanpmaxwell/express-generator-typescript#readme

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

### jasmine
一个命令行工具，https://www.npmjs.com/package/jasmine 运行node环境下的 Jasmine(https://github.com/jasmine/jasmine) specs 

### fs-extra 
替代fs操作文件系统的方法 https://www.npmjs.com/package/fs-extra

### find
找文件，文件夹等 https://www.npmjs.com/package/find

### command-line-args
（执行某个文件的命令行参数）解析命令行的值，另有他用 https://www.npmjs.com/package/command-line-args
比如在 pre-start中  `ts-node --files -r tsconfig-paths/register ./src`
```
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
将 .env 文件的环境变量添加到 `process.env` 中

