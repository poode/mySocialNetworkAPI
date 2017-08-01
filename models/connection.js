/**
 * mysocialnetworkapi
 * (c) 2017 Gautam ANAND (me@gautamanand.in)
 * models/connection.js
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connectionModelConfiguration = new Schema({
	timeaccessed: {
		type: Date,
		default: Date.now
	}
}, {
	versionKey: false
});

module.exports = mongoose.connection.model('connections', connectionModelConfiguration);