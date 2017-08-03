/**
 * mysocialnetworkapi
 * (c) 2017 Gautam ANAND (me@gautamanand.in)
 * routes.js
 */

 'use strict';

 var express = require('express');
 var router = express.Router();

router.all('/*', require('./tools/HTTP').basicAuth);

 router.get('/', function(req,res){
 	res.json({

 		"GET":{
 			"connection":{
 				"URL": req.protocol + '://' + req.hostname + ':' + req.app.get('port') + "/connection",
 				"description": "List all connection between two email addresses"
 			},
 			"updates":{
 				"URL": req.protocol + '://' + req.hostname + ':' + req.app.get('port') + "/updates",
 				"description": "List all users that are wither subscribed/blockec"
 			},
 			"blocked":{
 				"URL": req.protocol + '://' + req.hostname + ':' + req.app.get('port') + "/updates?block=true",
 				"description": "List all users that are blocked and wont recieve any notifications"
 			},
 			"subscribed":{
 				"URL": req.protocol + '://' + req.hostname + ':' + req.app.get('port') + "/updates?block=false",
 				"description": "List all users that are subscribed and would recieve notifications"
 			}
 		},
 		"POST":{
 			"connection":{
 				"URL": req.protocol + '://' + req.hostname + ':' + req.app.get('port') + "/connection",
 				"description": "Create connection between two email addresses. (Task01). Please see JSON SPEC in ./docs/JSONAPI.md"
 			},
 			"friends":{
 				"URL": req.protocol + '://' + req.hostname + ':' + req.app.get('port') + "/friends",
 				"description": "Retrieve the friends list for an email address. (Task02). Please see JSON SPEC in ./docs/JSONAPI.md"
 			},
 			"friends/common":{
 				"URL": req.protocol + '://' + req.hostname + ':' + req.app.get('port') + "/friends/common",
 				"description": "Retrieve the common friends list between two email addresses. (Task03). Please see JSON SPEC in ./docs/JSONAPI.md"
 			},
 			"updates/subscribe":{
 				"URL": req.protocol + '://' + req.hostname + ':' + req.app.get('port') + "/updates/subscribe",
 				"description": "Subscribe to updates from an email address. (Task04). Please see JSON SPEC in ./docs/JSONAPI.md"
 			},
 			"updates/block":{
 				"URL": req.protocol + '://' + req.hostname + ':' + req.app.get('port') + "/updates/block",
 				"description": "Block updates from an email address. (Task05). Please see JSON SPEC in ./docs/JSONAPI.md"
 			},
 			"updates/emails":{
 				"URL": req.protocol + '://' + req.hostname + ':' + req.app.get('port') + "/updates/emails",
 				"description": "Retrieve all email addresses that can receive updates from an email address. (Task06). Please see JSON SPEC in ./docs/JSONAPI.md"
 			}
 		}
 	})
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

//List all subscription/block rules (Bonus)
router.get('/updates',require('./controllers/updates').READ_ALL);

module.exports = router;