/**
 * mysocialnetworkapi
 * (c) 2017 Gautam ANAND (me@gautamanand.in)
 * controllers/users.js
 */
 'use strict';

var async = require('async');
var applicationName = require('../package.json').name;
var updatesModel = require('../models/updates');


/*
Use any HTTP Client like POSTMAN and pass the following as POST request in body/raw/JSON
{
  "requestor": "lisa@example.com",
  "target": "john@example.com"
}
*/

exports.CREATE = function(req, res) {
	/*
	Error cases:
	- req.body.requestor should exists
	- req.body.requestor should of type string
	- req.body.requestor should be defined
	- req.body.target should exists
	- req.body.target should of type string
	- req.body.target should be defined
	*/

	if(req.body.requestor && typeof(req.body.requestor) === 'string' && req.body.requestor !== undefined && req.body.target && typeof(req.body.target) === 'string' && req.body.target !== undefined ){
		var model = new updatesModel(req.body);

		model.save(function(err) {
			if (err) {
				res.json({
					"err": true,
					"message": err
				})
			}
			res.json({
				"success": true
			})
		});
	} else {
		res.json({
			"err": true,
			"message": "You JSON is invalid"
		})
	}
}


 exports.BLOCK = function(req,res){

 	
 }

 exports.LIST_ALL = function(req,res){

 	
 }