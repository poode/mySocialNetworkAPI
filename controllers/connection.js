/**
 * mysocialnetworkapi
 * (c) 2017 Gautam ANAND (me@gautamanand.in)
 * controllers/connection.js
 */
'use strict';

var async = require('async');
var applicationName = require('../package.json').name;
var connectionModel = require('../models/connection');


/*
Use any HTTP Client like POSTMAN and pass the following as POST request in body/raw/JSON
{
  "friends": [
      "andy@example.com",
      "john@example.com"
    ]
}
//--
{
  "friends": [
      "andy@example.com",
      "eddy@example.com"
    ]
}
*/

exports.CREATE = function(req, res) {
	/*
	Error cases:
	- req.body.friends should exists
    - req.body.friends cannot have more than two entries
	- req.body.friends[0] should not be empty & should be a string
	- req.body.friends[1] should not be empty & should be a string
	*/
	
	if (req.body.friends && req.body.friends[0] !== undefined && req.body.friends[1] !== undefined && typeof(req.body.friends[0]) === 'string' && typeof(req.body.friends[1]) === 'string' && req.body.friends.length === 2) {
		var model = new connectionModel({
			friends: req.body.friends
		});

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

exports.READ_ALL = function(req, res) {
	var AllConnections = [];
	async.parallel([
			function(callback) {
				connectionModel.find(function(err, connection) {
					if (err) {
						return res.send(err);
					}

					for (var i = 0; i < connection.length; i++) {
						AllConnections.push({
							id: connection[i]._id,
							friends: connection[i].friends,
							timeaccessed: connection[i].timeaccessed
						});
					}
				}).lean().exec(callback);
			}
		],
		function(err, results) {
			if (err) {
				return res.send(err);
			}

			connectionModel.count({}, function(err, count_connections) {
				if (count_connections > 0) {
					res.json(AllConnections);
				} else {
					res.json({
						error: {
							value: true,
							message: 'You have not made any connections.'
						}
					});
				}
			});
		});
}


/*
Use any HTTP Client like POSTMAN and pass the following as POST request in body/raw/JSON
{
  "email": "andy@example.com"
}
*/
exports.LIST = function(req,res){
	/*
	Error cases:
	- req.body.email should exists
	- req.body.email should of type string
	- req.body.email should be defined
	*/
	if(req.body.email && typeof(req.body.email) === 'string' && req.body.email !== undefined ){
		var AllRelevantConnections = [];
		connectionModel.count({}, function(err, count_connections) {
			if (count_connections > 0) {
				connectionModel.count({
					friends: { $eq: req.body.email }
				}, function(err, count_connections_friends0) {
					connectionModel.find({
						friends: { $eq: req.body.email }
					},function(err, connection) {
						if (err) {
							return res.send(err);
						}

						for (var i = 0; i < connection.length; i++) {
							AllRelevantConnections.push(connection[i].friends[1]);
						}
						res.json({
							"success": true,
							"friends" : AllRelevantConnections,
							"count" : count_connections_friends0
						})
					}).lean()
				});

			} else {
				res.json({
					error: {
						value: true,
						message: 'You have not made any connections, hence cannot retrieve the friends list.'
					}
				});
			}
		});
	}else{
		res.json({
			"err": true,
			"message": "You JSON is invalid"
		})
	}
}

/*
Use any HTTP Client like POSTMAN and pass the following as POST request in body/raw/JSON
{
  "friends": [
      "andy@example.com",
      "john@example.com"
    ]
}
*/
exports.LIST_COMMON = function(req,res) {
	/*
	Error cases:
	- req.body.friends should exists
    - req.body.friends cannot have more than two entries
	- req.body.friends[0] should not be empty & should be a string
	- req.body.friends[1] should not be empty & should be a string
	*/
	if (req.body.friends && req.body.friends[0] !== undefined && req.body.friends[1] !== undefined && typeof(req.body.friends[0]) === 'string' && typeof(req.body.friends[1]) === 'string' && req.body.friends.length === 2) {
		var AllCommonFriends = [];
		connectionModel.count({}, function(err, count_connections) {
			if (count_connections > 0) {

				connectionModel.count({
					friends: { $eq: req.body.friends[0] && req.body.friends[1] }
				}, function(err, count_connections_common) {
					connectionModel.find({
						friends: { $eq: req.body.friends }
					},function(err, common) {
						if (err) {
							return res.send(err);
						}

						for (var i = 0; i < common.length; i++) {
							AllCommonFriends.push(common[i].friends[1]);
						}
						res.json({
							"success": true,
							"friends" : AllCommonFriends,
							"count" : count_connections_common
						})
					}).lean()
				});


			} else {
				res.json({
					error: {
						value: true,
						message: 'You have not made any connections, hence cannot retrieve the common friends list between two email addresses.'
					}
				});
			}
		});
	}else{
		res.json({
			"err": true,
			"message": "You JSON is invalid"
		})
	}
}

