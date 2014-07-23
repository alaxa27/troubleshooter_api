/**
 * Module dependencies.
 */

var express = require('express')
    , rek = require('rekuire')
    , SRV_CONFIG = require('config').Server
    , log = rek('libs/log')(module)
    , http = require('http')
    , path = require('path')
    //Routes
    , routes = require('./routes')
    , user = require('./routes/user') //Loads the Api routes of user
    //Models
    , FeedModel = require('./db/mongoose').FeedModel
    //Loads Authentication requirements
    , passport = require('passport')
    , morgan = require('morgan')
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , flash = require('connect-flash')
    //Load express
    , app = express();

//Loads authentification config
rek('libs/passport')(passport);

app.configure(function(){
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
//required for passport
  app.use(session({ secret: '59c60b8c4b' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
 app.use(flash()); // use connect-flash for flash messages stored in session
  app.use('/api', app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});



//Routes

app.get('/', routes.index);

//Execution of api related routes see routes/api/index.js for more infos
var apiRoutes = rek('routes/api')
apiRoutes(app, passport);
////////////////////////////////////

http.createServer(app).listen(SRV_CONFIG.srvPort, function(){
  log.info("Express server listening on port " + SRV_CONFIG.srvPort);
});
