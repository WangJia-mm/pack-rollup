/**
 * Created by wangjia16 on 2019/8/12.
 */
const ENV = process.env.NODE_ENV;
const path = require('path');
const babel = require('rollup-plugin-babel');
const buble = require('rollup-plugin-buble');
const json = require('rollup-plugin-json');

// 编译npm模块及其全局变量模块 插件模块
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const nodeGlobals = require('rollup-plugin-node-globals');
//开启服务插件
const serve = require('rollup-plugin-serve');
//编译css
const postcss = require('rollup-plugin-postcss');
const sass = require('node-sass');
// 处理rem换算
// const pxtorem = require('postcss-pxtorem');
const px2rem = require('postcss-px2rem');

const image = require('rollup-plugin-img');
// 监听文件改变，并刷新浏览器
const livereload = require('rollup-plugin-livereload');

// import copy from 'rollup-plugin-copy'
const copy = require('rollup-plugin-copy');

// const fileName = 'test';

const {fileName} = require('../postcss.config');

const resolveFile = function (filePath) {
    return path.join(__dirname, '..', filePath)
};

// console.log(resolveFile(fileName),22222);
// console.log(path.normalize(__dirname, '..', 'test'),3333);
// const resolveFile = function (filePath) {
//     return path.join(__dirname, '..', filePath)
// };

console.log(resolveFile(`${fileName}/index.html`),__filename,2222);

const resoleFileName = function (filePath) {
    let imgPath = `../${fileName}/build`;
    return path.join(__dirname, imgPath, filePath)
};

const isProductionEnv = ENV === 'production';

const processSass = function(context, payload) {
    return new Promise(( resolve, reject ) => {
        sass.render({
            file: context
        }, function(err, result) {
            console.log(result);
            if( !err ) {
                resolve(result);
            } else {
                console.log(err);
                reject(err)
            }
        });
    })
};


module.exports = [
    {
        input: resolveFile(`${fileName}/src/js/index.js`),
        output: {
            file: resolveFile(`${fileName}/build/js/index.js`),
            // format: 'cjs',
            format: 'umd',
            name: 'panTabs',
            // amd: {
            //     id: 'lib/demo'
            // },
        },
        plugins: [
            copy({
                targets: [
                    { src: 'src/index.html', dest: 'build/public' },
                    // { src: 'assets/images/**/*', dest: 'build/img' }
                ]
            }),
            postcss({
                extract: `${fileName}/build/css/index.css`,
                // extract: true,
                minimize: isProductionEnv,
                extensions:['css','scss'],
                // pxtorem:{
                //     // rootValue: 16, //默认根节点字体大小 config.psdWidth 通过设计稿设置字体大小
                //     rootValue: (16 * 750) / 320, //默认根节点字体大小 config.psdWidth 通过设计稿设置字体大小
                //     unitPrecision: 4, //保留几位小数
                //     propList: ['*'], //需要转换REM的属性 *为所谓
                //     selectorBlackList: [],
                //     replace: true, //是否替换转换前的值
                //     mediaQuery: true,
                //     minPixelValue: 0
                // },
                process:processSass,

            }),

            image({
                output: resoleFileName('/img'), // default the root
                extensions: /\.(png|jpg|jpeg|gif|svg)$/, // support png|jpg|jpeg|gif|svg, and it's alse the default value
                limit: 819200,  // default 8192(8k)
                exclude: 'node_modules/**'
            }),

            json(),
            babel({
                exclude: '**/node_modules/**'
            }),
            buble(),
            nodeResolve({
                // module: true, // ES6模块尽可能使用 ‘module’字段
            }),
            commonjs({
                include: [
                    'node_modules/**'
                ],
                exclude: [
                    'node_modules/process-es6/**'
                ],
                namedExports: {
                    'node_modules/react/index.js': ['Component', 'PureComponent', 'Fragment', 'Children', 'createElement']
                    // 'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
                    // 'node_modules/react-dom/index.js': ['render']
                }
            }),
            nodeGlobals(),

            // 开启服务
            ENV == 'development' ?
            serve({
                open: true, // 是否打开浏览器
                // contentBase: resolveFile(fileName), // 入口html的文件位置
                contentBase: './', // 入口html的文件位置
                historyApiFallback: true, // Set to true to return index.html instead of 404
                host: 'localhost',
                port: 3003
            })
            : '',
            livereload({
                watch:'/src'
            })

        ],
    },
];