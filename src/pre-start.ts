/**
 * Pre-start is where we want to place things that must run BEFORE the express 
 * server is started. This is useful for environment variables, command-line 
 * arguments, and cron-jobs.
 */

import path from 'path';
import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';

// **NOTE** Do not import any local paths here, or any libraries dependent
// on environment variables.


// **** Setup command line options **** //
// 解析运行的命令行参数，通过传入的环境变量来确定应该将 哪个环境变量描述的文件加载到process.env中
const options = commandLineArgs([
  {
    name: 'env',
    alias: 'e',
    defaultValue: 'development',
    type: String,
  },
]);


// **** Set the env file **** //

const result2 = dotenv.config({
  // 根据命令行参数配置环境变量的path路径，定位到对应 .env 文件，再转换到process.env中
  path: path.join(__dirname, `../env/${String(options.env)}.env`),
});

if (result2.error) {
  throw result2.error;
}
