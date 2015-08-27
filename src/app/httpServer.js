function httpServer(){
  var express = require('express');
  var path = require('path');
  var favicon = require('serve-favicon');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');

  //var routes = require('./routes/index');
  //var users = require('./routes/users');
  this.dataStore={};
  this.expressApp = express();

  var roomList = new Map();

  // view engine setup
  //app.set('views', path.join(__dirname, 'views'));
  //app.set('view engine', 'html');

  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.ico'));
  this.expressApp.use(logger('dev'));
  this.expressApp.use(bodyParser.json());
  this.expressApp.use(bodyParser.urlencoded({ extended: false }));
  this.expressApp.use(cookieParser());
  this.expressApp.use(express.static(__dirname+'/public'));

  //app.use('/', routes);
  //app.use('/users', users);
  this.expressApp.use(function(req,res,next){
     res.sendFile(__dirname+'/public/index.html');
     console.log("file send");
  });

  // catch 404 and forward to error handler

  this.expressApp.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    console.log(err);
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  /*if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
       res.send('404');
    });
  }*/

  // production error handler
  // no stacktraces leaked to user
  this.expressApp.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.send('404');
  });
  return this;
}

module.exports = new httpServer();
