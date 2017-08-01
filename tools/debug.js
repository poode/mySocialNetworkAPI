/**
 * mysocialnetworkapi
 * (c) 2017 Gautam ANAND (me@gautamanand.in)
 * tools/debug.js
 */
'use strict';

var debug = require('debug');
var morgan = require('morgan');
var colors = require('colors/safe');
var timestamp = require('console-timestamp');

var debugsuccess = debug('app-success');
var debugwarn = debug('app-warning');
var debugerror = debug('app-iserror');
var debugdb = debug('app-database');
var debugrouterp = debug('req-success');
var debugroutern = debug('req-iserror');
var debugrequeststart = debug('req-started');
var debugrequestfin = debug('req-isended');

/*-------------- morgan:statusDebug --------------*/
morgan.token('statusDebug', function getstatusDebug(req, res) {
	if (res.statusCode < 399) {
		return debugrouterp( ' ' + timestamp('DD-MM-YYYY hh:mm:ss:iii') + ' ' + colors.red(process.pid + ' ' + res.statusCode + ' ' + req.baseUrl));
	} else {
		return debugroutern( ' ' + timestamp('DD-MM-YYYY hh:mm:ss:iii') + ' ' + colors.green(process.pid + ' ' + res.statusCode + ' ' + req.baseUrl));
	}
});

/*-------------- morgan:reqstart --------------*/
morgan.token('reqstart', function getreqfin(req, res) {
	return debugrequeststart(timestamp('DD-MM-YYYY hh:mm:ss:iii') + ' ' + colors.red(req.method + " " + req.url + " " + req.ip))
});

/*-------------- morgan:reqfin --------------*/
morgan.token('reqfin', function getreqfin(req, res) {
	return debugrequestfin(timestamp('DD-MM-YYYY hh:mm:ss:iii') + ' ' + colors.red(req.method + " " + req.url + " " + req.ip))
});

/*-------------- debugTOLogConsole() --------------*/
function debugTOLogConsole() {
	return function(tokens, req, res) {
		return [
		tokens['reqstart'](req, res),
		tokens['statusDebug'](req, res),
		tokens['reqfin'](req, res)
		].join('');
	}
};

/*-------------- debugbyMorgan --------------*/
exports.debugbyMorgan = morgan(debugTOLogConsole());

/*-------------- FindfilePath --------------*/
exports.FindfilePath = function(filename) {
	filename = filename.split("/" + config.GithubFolderName + "/")[1];
	return process.pid + " " + filename + " "
}

exports.debugsuccess = debugsuccess;
exports.debugwarn = debugwarn;
exports.debugerror = debugerror;
exports.debugdb = debugdb;