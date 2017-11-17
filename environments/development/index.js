const commonConfig = require('../common');

const conf = {
    envLevel: 'development',
    htmlStrip: false,
    mockStart: false
}



module.exports = Object.assign({}, commonConfig, conf);