
const devConfig = require('./development');
const testConfig = require('./test');
const prodConfig = require('./production');

var pkgConfig = require('../package.json')

//default config
const defaultConfig = {
    env: 'DEV',
    port: '8080',
    vd: ''
}

const envMap = {
    'DEV': 'development',
    'TEST': 'test',
    'PRO': 'production'
}

const envConfig = {
    'development': devConfig,
    'test': testConfig,
    'production': prodConfig
}

//config get by package.json reject by pool
var poolEnv = pkgConfig.config || {}
var poolConfig = {
    version: pkgConfig.version,
    env: poolEnv.env || defaultConfig.env,
    port: poolEnv.port || defaultConfig.port
}

// get env by poolConfig
const devSetConfig = envConfig[envMap[poolConfig.env]];

module.exports = Object.assign({}, devSetConfig,  poolConfig);
