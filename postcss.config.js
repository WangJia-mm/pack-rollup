/**
 * Created by wangjia16 on 2019/8/19.
 */

// const path = 'path';

const fileName = 'test';



module.exports = {
    plugins: {
        "postcss-px2rem": {
            remUnit: (16 * 750) / 320, // 50px = 1rem
            remPrecision: 2 // rem的小数点后位数
        }
    },
    fileName,
};