/**
 * Remove old files, copy front-end ones.
 */

import fs from 'fs-extra';
import logger from 'jet-logger';
import childProcess from 'child_process';

// 构建的时候通过 package.json 的 build脚本执行此ts文件。使用到 ts-node 直接运行ts文件
// 主要是将前端代码cp到public位置
// Start
(async () => {
  try {
    // Remove current build
    await remove('./dist/');
    // // Copy front-end files
    await copy('./src/public', './dist/public');
    await copy('./src/views', './dist/views');
    // Copy back-end files
    logger.info(`~~~~~~~~~~~ ${__dirname}`)
    await exec('tsc --build tsconfig.prod.json', './');
  } catch (err) {
    logger.err(err);
  }
})();

/**
 * Remove file
 */
function remove(loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.remove(loc, (err) => {
      // !! 只应用于将类型转换为布尔值,err不为空的时候，会执行rej
      return (!!err ? rej(err) : res());
    });
  });
}

/**
 * Copy file.
 */
function copy(src: string, dest: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.copy(src, dest, (err) => {
      return (!!err ? rej(err) : res());
    });
  });
}

/**
 * Do command line command.
 * 将服务端的代码编译为js到dist目录
 */
function exec(cmd: string, loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return childProcess.exec(cmd, {cwd: loc}, (err, stdout, stderr) => {
      logger.info(`~~~~~~~~~~~ ${err}, ${stdout}, ${stderr}`)
      if (!!stdout) {
        logger.info(stdout);
      }
      if (!!stderr) {
        logger.warn(stderr);
      }
      return (!!err ? rej(err) : res());
    });
  });
}
