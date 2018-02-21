/**
 * mysocialnetworkapi
 * (c) 2017 Gautam ANAND (me@gautamanand.in)
 * app.js
 */
 'use strict';

 var express = require('express');
 var path = require('path');
 var favicon = require('serve-favicon');
 var logger = require('morgan');
 var envs = require('envs');
 var cookieParser = require('cookie-parser');
 var bodyParser = require('body-parser');
 var errorHandler = require('express-error-handler');
 var timestamp = require('console-timestamp');
 var colors = require('colors/safe');
 var fs = require('fs');
 var mongoose = require('mongoose');

 var routes = require('./routes');
 var database = require('./tools/database');
 var errors = require('./tools/error');
 var timeFormat = 'DD-MM-YYYY hh:mm:ss:iii';
 var app = express();

if (envs('HTTPS') === 'enabled') {
    /*-------------- SSL certificate and Keys configuration --------------*/
    if (envs('NODE_ENV') === 'LOCAL') {
        var SSLkeyValue = fs.readFileSync('./tools/ssl/LOCAL/LocalName.key');
        var SSLCertValue = fs.readFileSync('./tools/ssl/LOCAL/LocalName.crt');
    }
/*
    if (envs('NODE_ENV') === 'PRO') {
        var SSLkeyValue = ....;
        var SSLCertValue = ...;
    }
*/
    /*-------------- SSL PORT and Export Config --------------*//
    var HTTPSPort = 443;
    var SSL_conf = {
        key: SSLkeyValue,
        cert: SSLCertValue
    };
}

/*-------------- Customised Developer messages handled by the debug mode --------------*/
var debugsuccess = require('./tools/debug').debugsuccess;
var debugwarn = require('./tools/debug').debugwarn;
var debugerror = require('./tools/debug').debugerror;
var debugdb = require('./tools/debug').debugdb;
var debugpath = require('./tools/debug').FindfilePath(__filename);


/*-------------- Start the MongoDB connection  --------------*/
database.DatabaseURIPromise;
database.DatabaseURI;

/*-------------- Debug Mongoose --------------*/
if (envs('DEBUG_MODE_DB') === 'true') {
  mongoose.set('debug', function(collectionName, method, query, doc, options) {
    debugdb(timestamp(timeFormat) + ' ' + colors.magenta(debugpath) + colors.magenta('Collection.method -> ') + colors.magenta(collectionName + '.' + method));
    debugdb(timestamp(timeFormat) + ' ' + colors.magenta(debugpath) + colors.magenta('Query -> ') + colors.magenta(JSON.stringify(query)));
    debugdb(timestamp(timeFormat) + ' ' + colors.magenta(debugpath) + colors.magenta('Options -> ') + colors.magenta(JSON.stringify(options)));
  });
}

/*-------------- set the port --------------*/
var port = normalizePort(process.env.PORT || '80');
app.set('port', port);

/*-------------- View engine setup --------------*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*-------------- favicon --------------*/
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/*-------------- Start the Logger ---------------------------*/
app.use(require('./tools/log').loggerSystem);
app.use(require('./tools/debug').debugbyMorgan);

/*-------------- Body Parser --------------*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

/*-------------- Cookie Parser --------------*/
app.use(cookieParser());

/*-------------- Setting static folder--------------*/
app.use(express.static(path.join(__dirname, 'public')));

/*-------------- Setting routes --------------*/
app.use('/', routes);

/*-------------- Error Handling --------------*/
app.use(errors.http404);
app.use(errors.httpServerErrors);
app.use(errors.isClientErrors);
app.use(errors.HandleMongooseError);

/*-------------- Handling process killing --------------*/
process.on('SIGINT', function() {
  server.close(); //Closing HTTP server
  // calling .shutdown allows your process to exit normally 
  mongoose.connection.close(function() {
    debugsuccess(timestamp(timeFormat) + ' ' + colors.red(debugpath) + colors.red('process.on(SIGINT) -> ') + colors.red('true'));
  });
  process.exit();
});

/*-------------- onError() --------------*/
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
    console.error(bind + ' requires elevated privileges');
    process.exit(1);
    break;
    case 'EADDRINUSE':
    console.error(bind + ' is already in use');
    process.exit(1);
    break;
    default:
    throw error;
  }
}

/*-------------- normalizePort() --------------*///
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/*-------------- Event listener for HTTP server "listening" event --------------*/
function onListeninghttp() {
  debugsuccess(timestamp(timeFormat) + ' ' + colors.red(debugpath) + colors.red('server.address().port -> ') + colors.red(server.address().port));
}

function onListeninghttps() {
  debugsuccess(timestamp(timeFormat) + ' ' + colors.red(debugpath) + colors.red('SSLserver.address().port -> ') + colors.red(SSLserver.address().port));
}

/*-------------- Start server using http() and handlers --------------*/
var http = require('http');
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListeninghttp);
app.use(errorHandler({
  server: server
}));

/*-------------- Start server using https() and handlers --------------*/
if (envs('HTTPS') === 'enabled') {
  var https = require('https');
    //Get the Port for HTTPS
    app.set('HTTPSPort', HTTPSPort);

    //Start the HTTPS server
    var SSLserver = https.createServer(SSL_conf, app);
    SSLserver.listen(HTTPSPort);
    SSLserver.on('error', onError);
    SSLserver.on('listening', onListeninghttps);
    app.use(errorHandler({
      SSLserver: SSLserver
    }));

  }

/*-------------- Console message if the server has started --------------*/
console.log('----------DEPLOYMENT ENV CONFIG----------');
console.log(colors.yellow('PID=') + colors.green(process.pid) + '\n' + colors.yellow('NODE_ENV=') + colors.green(envs('NODE_ENV')) + '\n' + colors.yellow('HTTPS=') + colors.green(envs('HTTPS')) + '\n' + colors.yellow('DEBUG_MODE=') + colors.green(envs('DEBUG_MODE')) + '\n' + colors.yellow('DEBUG_MODE_DB=') + colors.green(envs('DEBUG_MODE_DB')) + '\n' + colors.yellow('DB_ENV=') + colors.green(envs('DB_ENV')));
console.log('------------------------------');

 module.exports = app;