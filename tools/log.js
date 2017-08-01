/**
 * mysocialnetworkapi
 * (c) 2017 Gautam ANAND (me@gautamanand.in)
 * tools/log.js
 */
'use strict';

var HTTPLogger = require('mongo-morgan-ext');
var db = require('./database').connectionString4Database;
var collectionName = 'logs';

/*-------------- SkipFunction ---------------------------*/
var skipfunction = function(req, res) {
    return res.statusCode > 399;
}

/*-------------- Logger with SkipFunction ---------------------------*/
exports.loggerSystem = HTTPLogger(db,collectionName,skipfunction); //It only stores errors, offcourse this can be for all the use cases.