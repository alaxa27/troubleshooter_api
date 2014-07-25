var rek = require('rekuire')
    , log = rek('libs/log')(module)
    , cors = require('cors');

module.exports = function(app, passport, handlers) {
    app.get('/feeds', cors(), handlers.feeds.getFeeds);
    app.post('/feeds', cors(), handlers.feeds.postFeed);
    app.get('/feeds/:id', cors(), handlers.feeds.getFeed);
    app.delete('/feeds/:id', cors(), handlers.feeds.deleteFeed);
    app.put('/feeds/:id', cors(), handlers.feeds.putFeed);
    /*---------------------------------*/
    app.get('/auth/google', cors(), handlers.auth.googleSignIn);
    app.get('/auth/google/callback', cors(), handlers.auth.googleSignInCallback);
    app.get('/auth/facebook', cors(), handlers.auth.facebookSignIn);
    app.get('/auth/facebook/callback', cors(), handlers.auth.facebookSignInCallback);
    app.get('/auth/local', cors(), handlers.auth.localSignIn);
    app.get('/auth/local/callback', cors(), handlers.auth.localSignInCallback);
    /*---------------------------------*/
    app.get('/user', cors(), handlers.user.getUsers);
    app.get('/user/:id', cors(), handlers.user.getUser);
    app.put('/user/:id', cors(), handlers.user.updateUser);
    app.get('/user/:first/:last/:email', cors(), handlers.user.createUser);
    log.info("Successfully set up routes");
};

