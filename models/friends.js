/**
 * mysocialnetworkapi
 * (c) 2017 Gautam ANAND (me@gautamanand.in)
 * models/friends.js
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var friendsModelConfiguration = new Schema({
	friends: [{
		type: String
	}],
	timeaccessed: {
		type: Date,
		default: Date.now
	}
}, {
	versionKey: false
});

module.exports = mongoose.connection.model('friends', friendsModelConfiguration);