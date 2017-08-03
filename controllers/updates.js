/**
 * mysocialnetworkapi
 * (c) 2017 Gautam ANAND (me@gautamanand.in)
 * controllers/users.js
 */
'use strict';

var async = require('async');
var applicationName = require('../package.json').name;
var updatesModel = require('../models/updates');
var connectionModel = require('../models/connection');

exports.READ_ALL = function(req, res) {
	var AllUpdates = [];
	async.parallel([
			function(callback) {
				updatesModel.find(function(err, update) {
					if (err) {
						return res.send(err);
					}

					if (req.query.block) {
						if (req.query.block === 'true') {
							for (var i = 0; i < update.length; i++) {
								if (update[i].isBlocked === true) {
									AllUpdates.push({
										id: update[i]._id,
										requestor: update[i].requestor,
										target: update[i].target,
										isBlocked: update[i].isBlocked,
										timeaccessed: update[i].timeaccessed
									});
								}
							}
						}
						if (req.query.block === 'false') {
							for (var i = 0; i < update.length; i++) {
								if (update[i].isBlocked === false) {
									AllUpdates.push({
										id: update[i]._id,
										requestor: update[i].requestor,
										target: update[i].target,
										isBlocked: update[i].isBlocked,
										timeaccessed: update[i].timeaccessed
									});
								}
							}
						}
					} else {
						for (var i = 0; i < update.length; i++) {
							AllUpdates.push({
								id: update[i]._id,
								requestor: update[i].requestor,
								target: update[i].target,
								isBlocked: update[i].isBlocked,
								timeaccessed: update[i].timeaccessed
							});
						}
					}


				}).lean().exec(callback);
			}
		],
		function(err, results) {
			if (err) {
				return res.send(err);
			}

			updatesModel.count({}, function(err, count_updates) {
				if (count_updates > 0) {
					res.json(AllUpdates);
				} else {
					res.json({
						error: {
							value: true,
							message: 'You have not made any subscriptions for the friends that are connected.'
						}
					});
				}
			});
		});
}

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

	if (req.body.requestor && typeof(req.body.requestor) === 'string' && req.body.requestor !== undefined && req.body.target && typeof(req.body.target) === 'string' && req.body.target !== undefined) {
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

/*
Use any HTTP Client like POSTMAN and pass the following as POST request in body/raw/JSON
{
  "requestor": "andy@example.com",
  "target": "john@example.com"
}

Suppose "andy@example.com" blocks "john@example.com":
- if they are connected as friends, then "andy" will no longer receive notifications from "john"
- if they are not connected as friends, then no new friends connection can be added

*/
exports.BLOCK = function(req, res) {
	var isConnected = [];
	/*
	Error cases:
	- req.body.requestor should exists
	- req.body.requestor should of type string
	- req.body.requestor should be defined
	- req.body.target should exists
	- req.body.target should of type string
	- req.body.target should be defined
	*/
	if (req.body.requestor && typeof(req.body.requestor) === 'string' && req.body.requestor !== undefined && req.body.target && typeof(req.body.target) === 'string' && req.body.target !== undefined) {
		connectionModel.findOne({
			friends: {
				$eq: [req.body.requestor, req.body.target]
			}
		}, function(err, connection) {
			if (err) {
				return res.send(err);
			}
			updatesModel.findOne({
					requestor: {
						$eq: req.body.requestor
					},
					target: {
						$eq: req.body.target
					}
				},
				function(err, isConnected) {
					if (err) {
						return res.send(err);
					}
					isConnected.isBlocked = true; //Change the isBlock Status
					isConnected.save(function(err) {
						if (err) {
							res.json({
								"err": true,
								"message": err
							})
						}
						res.json({
							"success": true
						})
					})
				});

		});

	} else {
		res.json({
			"err": true,
			"message": "You JSON is invalid"
		})
	}
}

/*
Use any HTTP Client like POSTMAN and pass the following as POST request in body/raw/JSON
{
	"sender":  "john@example.com",
	"text": "Hello World! kate@example.com"
}

Eligibility for receiving updates from i.e. "john@example.com":
- has not blocked updates from "john@example.com", and
- at least one of the following:
- has a friend connection with "john@example.com"
- has subscribed to updates from "john@example.com"
- has been @mentioned in the update
*/
exports.LIST_ALL = function(req, res) {


	/*
	{
		"success": true
		"recipients":
		[
		"lisa@example.com",
		"kate@example.com"
		]
	}
	*/

}