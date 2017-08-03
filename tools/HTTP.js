/**
 * mysocialnetworkapi
 * (c) 2017 Gautam ANAND (me@gautamanand.in)
 * tools/log.js
 */
'use strict';

var basic_Auth = require('basic-auth');

//HTTP Authentication
exports.basicAuth = function (req, res, next) {
function unauthorized(res) {
res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
return res.sendStatus(401);
}

var user = basic_Auth(req);
if (!user || !user.name || !user.pass) {
return unauthorized(res);
}

if (user.name === 'c0de3samplebyG@ut@m' && user.pass === 'c0de3samplebyG@ut@m') {
return next();
} else {
return unauthorized(res);
}
};

