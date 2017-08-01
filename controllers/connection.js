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
*/

exports.POST = function(req, res) {
	/*
	Error cases:
	- req.body.friends should exists
	- req.body.friends[0] should not be empty & should be a string
	- req.body.friends[1] should not be empty & should be a string
	*/

	if (req.body.friends && req.body.friends[0] !== undefined && req.body.friends[1] !== undefined && typeof(req.body.friends[0]) === 'string' && typeof(req.body.friends[1]) === 'string') {
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

exports.GET_ALL = function(req, res) {
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