/**
 * Created by wangjia16 on 2019/8/12.
 */
const compileTask = require('./compile_task');
const configList = require('./rollup.config.prod');

compileTask(configList);