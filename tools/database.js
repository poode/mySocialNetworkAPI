/**
 * mysocialnetworkapi
 * (c) 2017 Gautam ANAND (me@gautamanand.in)
 * tools/database.js
 */
 'use strict';

 var mongoose = require('mongoose');
 var envs = require('envs');

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
 		console.log('DatabaseURI.err', err)
 	} else {
 		console.log('DatabaseURI', 'OK')
 	}

 });

 exports.connectionString4Database = connectionString4Database;