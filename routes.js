/**
 * mysocialnetworkapi
 * (c) 2017 Gautam ANAND (me@gautamanand.in)
 * routes.js
 */

 'use strict';

 var express = require('express');
 var router = express.Router();

 router.get('/', function(req,res){
 	res.redirect('/connection');
 });

//Create connection between two email addresses. (Task01)
router.post('/connection',require('./controllers/connection').CREATE);//DONE

//List all connection between two email addresses. (Bonus)
router.get('/connection',require('./controllers/connection').READ_ALL);//DONE

//Retrieve the friends list for an email address. (Task02)
router.post('/friends',require('./controllers/connection').LIST);//DONE

//Retrieve the common friends list between two email addresses. (Task03)
router.post('/friends/common',require('./controllers/connection').LIST_COMMON);

//Subscribe to updates from an email address. (Task04)
router.post('/updates/subscribe',require('./controllers/updates').CREATE);

//Block updates from an email address. (Task05)
router.post('/updates/block',require('./controllers/updates').BLOCK);

//Retrieve all email addresses that can receive updates from an email address. (Task06)
router.post('/updates/emails',require('./controllers/updates').LIST_ALL);

module.exports = router;