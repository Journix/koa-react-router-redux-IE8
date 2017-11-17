#!/usr/local/bin/babel-node
require('babel-polyfill')

const {syncConfig, asyncConfig} = require('../config')
const {port, env, envLevel} = syncConfig
var src  = envLevel !== 'development' ? '../prod/server' : '../src/server'

if (envLevel === 'development') {
	// for development use babel/register for faster runtime compilation
	require('babel-register')
}

var server = require(src).default
// server.listen(port)
asyncConfig(APP_CONFIG => {
	server.listen(port)
	var runLog = `listening on port [${port}], env is [${env}] and describe as [${envLevel}]`
	console.log(runLog)
})
