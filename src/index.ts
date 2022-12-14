// 主要是处理脚本的运行环境变量
import './pre-start'; // Must be the first import  启动前脚本执行
import logger from 'jet-logger';

import EnvVars from '@configurations/EnvVars';
import server from './server';


// **** Start server **** //

const msg = ('Express server started on port: ' + EnvVars.port.toString());
server.listen(EnvVars.port, () => logger.info(msg));
