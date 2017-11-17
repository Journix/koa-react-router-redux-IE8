const commonConfig = require('../common');

const conf = {
    envLevel: 'production',
    htmlStrip: true
}

module.exports = Object.assign({}, commonConfig, conf);