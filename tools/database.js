/**
 * mysocialnetworkapi
 * (c) 2017 Gautam ANAND (me@gautamanand.in)
 * tools/database.js
 */
 'use strict';

 var mongoose = require('mongoose');
 var envs = require('envs');
 var timestamp = require('console-timestamp');
 var colors = require('colors/safe');
 var timeFormat = 'DD-MM-YYYY hh:mm:ss:iii';

 /*-------------- Customised Developer messages handled by the debug mode --------------*/
 var debugsuccess = require('./debug').debugsuccess;
 var debugwarn = require('./debug').debugwarn;
 var debugerror = require('./debug').debugerror;
 var debugdb = require('./debug').debugdb;
 var debugpath = require('./debug').FindfilePath(__filename);

 if (envs('DB_ENV') === 'LOCAL') {
 	var MongoHost = 'localhost';
 	var MongoPort = '27017';
 	var connectionString4Database = 'mongodb://' + MongoHost + ':' + MongoPort + '/mySocialNetworkAPI';
 }

 var DatabaseURIOptions = {
 	ssl: false,
 	useMongoClient: true
 };

 /*-------------- database connected via mongoose --------------*/
 exports.DatabaseURIPromise = mongoose.Promise = global.Promise;
 exports.DatabaseURI = mongoose.connect(connectionString4Database, DatabaseURIOptions, function(err) {
 	if (err) {
 		debugerror(timestamp(timeFormat) + ' ' + colors.green(debugpath) + colors.green('mysocialnetworkapi.connect.err -> ') + colors.green(err));
 	} else {
 		debugsuccess(timestamp(timeFormat) + ' ' + colors.red(debugpath) + colors.red('mysocialnetworkapi.connect -> ') + colors.red('Ok'));
 	}
 });

 exports.connectionString4Database = connectionString4Database;