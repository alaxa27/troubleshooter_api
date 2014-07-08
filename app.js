/**
 * Module dependencies.
 */

var express = require('express')
    , rek = require('rekuire')
    , SRV_CONFIG = require('config').Server
    , log = rek('libs/log')(module)
    , routes = require('./routes')
    , user = require('./routes/user') //Loads the Api routes of user
    , http = require('http')
    , path = require('path')
    , FeedModel = require('./db/mongoose').FeedModel
    , app = express();

app.configure(function(){
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
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
app.get('/users', user.list);

//Execution of api related routes see routes/api/index.js for more infos

var apiRoutes = require('./routes/api')
apiRoutes(app);

http.createServer(app).listen(SRV_CONFIG.srvPort, function(){
  log.info("Express server listening on port " + SRV_CONFIG.srvPort);
});
