const commonConfig = require('../common');

const conf = {
    envLevel: 'test',
    htmlStrip: true
}

module.exports = Object.assign({}, commonConfig, conf);