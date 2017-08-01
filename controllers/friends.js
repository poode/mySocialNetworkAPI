/**
 * mysocialnetworkapi
 * (c) 2017 Gautam ANAND (me@gautamanand.in)
 * controllers/friends.js
 */
 'use strict';

 var async = require('async');
 var applicationName = require('../package.json').name;
 var friendsModel = require('../models/friends');


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
		var model = new friendsModel({
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
	}
	else {
		res.json({
			"err": true,
			"message": "You JSON is invalid"
		})
	}
}


exports.GET_ALL = function() {

}

exports.POST_common = function() {

}