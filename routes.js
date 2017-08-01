/**
 * mysocialnetworkapi
 * (c) 2017 Gautam ANAND (me@gautamanand.in)
 * routes.js
 */

 'use strict';

 var express = require('express');
 var router = express.Router();

 router.get('/', function(){
 	res.redirect('/connection');
 });

//Create connection between two email addresses. (Task01)
router.post('/connection',require('./controllers/connection').POST);

//List all connection between two email addresses. (Bonus)
router.get('/connection',require('./controllers/connection').GET_ALL);

//Retrieve the friends list for an email address. (Task02)
router.post('/friends',require('./controllers/friends').POST);

//Retrieve the friends list for an email address. (Bonus)
router.get('/friends',require('./controllers/friends').GET_ALL);

//Retrieve the common friends list between two email addresses. (Task03)
router.post('/friends/common',require('./controllers/friends').POST_common);

//Subscribe to updates from an email address. (Task04)
router.post('/updates/subscribe',require('./controllers/updates').POST_subscribe);

//Block updates from an email address. (Task05)
router.post('/updates/block',require('./controllers/updates').POST_block);

//Retrieve all email addresses that can receive updates from an email address. (Task06)
router.post('/updates/emails',require('./controllers/updates').POST_emails);

module.exports = router;