/* eslint-disable node/no-process-env */

// 环境变量的映射以及导出
// 当pre-start文件执行后，命令行参数对应的.env文件中的配置的环境变量已经
// 存储在了 process.env 中，在此直接读取即可
export default {
  nodeEnv: (process.env.NODE_ENV ?? ''),
  port: (process.env.PORT ?? 0),
  cookieProps: {
    key: 'ExpressGeneratorTs',
    secret: (process.env.COOKIE_SECRET ?? ''),
    options: {
      httpOnly: true,
      signed: true,
      path: (process.env.COOKIE_PATH ?? ''),
      maxAge: Number(process.env.COOKIE_EXP ?? 0),
      domain: (process.env.COOKIE_DOMAIN ?? ''),
      secure: (process.env.SECURE_COOKIE === 'true'),
    },
  },
  jwt: {
    secret: (process.env.JWT_SECRET ??  ''),
    exp: (process.env.COOKIE_EXP ?? ''), // exp at the same time as the cookie
  },
} as const;
