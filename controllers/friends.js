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
	var model = new friendsModel({
		friends: req.body.friends
	});

	model.save(function(err) {
		if (err) {
			res.json({
				"err":true,
				"message":err
			})
		}
		res.json({
			"success": true
		})
	});
}


exports.GET_ALL = function(){

}

exports.POST_common = function(){

}