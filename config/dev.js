
/**
 * Created by wangjia16 on 2019/8/12.
 */
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');
const Koa = require('koa');
const KoaStatic = require('koa-static');
const compileTask = require('./compile_task');
const configList = require('./rollup.config.dev');

const app = new Koa();

const {fileName} = require('../postcss.config');

const projectPath = path.join(__dirname, '..');
const srcPath = path.join(projectPath, `${fileName}/src`);

// const projectPath = path.join(__dirname, '../sass');
// const srcPath = path.join(projectPath, '');
// console.log(projectPath,'aa');
// console.log(srcPath, 'bb');

function watchSrc () {
    chokidar.watch(srcPath, {
        ignored: /(^|[\/\\])\../
    }).on('all', (event, path) => {
        if ( event === 'change' ) {
            console.log(event,'event');
            compileTask(configList);
        }
    });
}

app.use(KoaStatic(projectPath));

app.listen(3003, function(){

    compileTask(configList);
    watchSrc();
    // 自动开启浏览器
    // cp.exec('open http://127.0.0.1:3003');
});