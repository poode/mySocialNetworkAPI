/**
 * mysocialnetworkapi
 * (c) 2017 Gautam ANAND (me@gautamanand.in)
 * tools/error.js
 */
 'use strict';

 var errorHandler = require('express-error-handler');
 var timeout = require('connect-timeout');
 var mongoose = require('mongoose');
 var timestamp = require('console-timestamp');
 var colors = require('colors/safe');
 var timeFormat = 'DD-MM-YYYY hh:mm:ss:iii';

 var debugvariable = require('./debug');
 var debugsuccess = debugvariable.debugsuccess;
 var debugwarn = debugvariable.debugwarn;
 var debugerror = debugvariable.debugerror;
 var debugdb = debugvariable.debugdb;
 var debugpath = debugvariable.FindfilePath(__filename);

 /*-------------- Handling 404 error - Logging and redirecting--------------*/
 exports.http404 = function(req, res, next) {
 	var err = new Error('Not found');
 	err.status = 404;
 	res.redirect('/');
 };

 /*-------------- Handling all errors--------------*/
 exports.httpServerErrors = function(err, req, res, next) {
 	if (err) {
        res.status(err.status || 500); //Set the status of the error for the res object
        res.render('error', {
        	errstatus: err.status || 500,
        	message: err.message,
        	error: err,
        	hiddenErr: err,
        	user: req.user,
        	path: req.path
        });
    } else {
    	next();
    }
}

/*-------------- Handling all ClientErrors--------------*/
exports.isClientErrors = function(err, req, res, next) {
	if (errorHandler.isClientError(404) === true || errorHandler.isClientError(500) === true) {
		res.render('error', {
			message: err.message,
			error: err,
			hiddenErr: err,
			user: "",
			path: req.path
		});
	} else {
		next();
	}
}

/*-------------- Handling the connection-timeout between middlewares--------------*/
exports.timeout = timeout('5s');

exports.haltOnTimedout = function(req, res, next) {
	if (!req.timedout) {
		next();
	}
}

exports.HandleMongooseError = function(req, res, next) {
	if (mongoose.connection.readyState !== 1) {
		return next(new HttpError(500, "DataBase disconnected"));
		debugsuccess(timestamp(timeFormat) + ' ' + colors.red(debugpath) + colors.red('Database disconnected'));
	}
	next();
}