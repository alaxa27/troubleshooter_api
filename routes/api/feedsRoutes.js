var rek = require('rekuire')
    , log = rek('libs/log')(module)
    , FeedModel = rek('db/mongoose').FeedModel;


//functions used when /api/feeds is opened in the browser RESTful services

module.exports = function(app) {
    app.get('/feeds', function(req, res){ //return json of all feeds
        return FeedModel.find(function(err, feeds) {
            if (!err) {
                res.statusCode = 200;
                res.send(feeds);
            } else {
                log.error(err);
                res.send({error: err});
            }
        });
    });

    app.post('/feeds', function(req, res){ //post a new feed into db according to received Json
        var now = new Date();
        var feed = new FeedModel({
            title: req.body.title
            , content: req.body.content
        });
        feed.save(function(err) {
            if (!err) {
                log.info("Feed created");
                return (res.send({ status: 'OK', feed:feed}));
            } else {
                log.error(err);
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
                log.error('Internal error(%d): %s',res.statusCode,err.message);
            }
        });
    });

    app.get('/feeds/:id', function(req, res){ //display a single feed
        return FeedModel.findById(req.params.id, function(err, feed) {
            if (!feed) {
                res.statusCode = 404;
                log.error("404 " + err);
                return (res.send({ error: 'not found' }));
            }
            if (!err) {
                return (res.send(feed));
            } else {
                log.error(err);
                return (res.send({ error: err }));
            }
        });
    });

    app.delete('/feeds/:id', function(req, res){ //Delete a single feed
    return FeedModel.findById(req.params.id, function (err, feed) {
            if (!feed) {
                res.statusCode = 404;
                log.error("404 " + err);
                return (res.send({ error: 'feed is not defined' }));
            }
            return feed.remove(function (err) {
                if (!err) {
                    log.info( "Article " + req.params.id + " removed." );
                    return (res.send({ status : 'OK' }));
                } else {
                    log.error(err);
                    return (res.send({ error : err }));
                }
            });
        });
    });

    app.put('/feeds/:id', function(req, res){ // Modify single feed
        return FeedModel.findById(req.params.id, function (err, feed) {
            if (!feed) {
                res.statusCode = 404;
                log.error("404" + err);
                return (res.send({ "error" : "feed is not defined" }));
            }
            now = new Date();
            feed.title = req.body.title;
            feed.content = req.body.content;
            feed.modified = now;
            return feed.save( function (err) {
                if (!err) {
                    log.info("Feed " + req.params.id + " modified.");
                    return (res.send({ status: 'OK', feed: feed }));
                } else {
                    if(err.name == 'ValidationError') {
                        res.statusCode = 400;
                        res.send({ error: 'Validation error' });
                    } else {
                        res.statusCode = 500;
                        res.send({ error: 'Server error' });
                    }
            log.error('Internal error(%d): %s',res.statusCode,err.message);

                }
            });
        });
    });
};
