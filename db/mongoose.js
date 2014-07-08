var mongoose = require('mongoose')
    , rek = require('rekuire')
    , DB_CONFIG = require('config').Mongoose
    , log = rek('libs/log')(module)
    , UserModel = require('./userModel').UserModel //userModel defines a user in db
    , FeedModel = require('./feedModel').FeedModel; //feedModel defines a feed in db

//connect to the db according to /config.json
mongoose.connect('mongodb://' + DB_CONFIG.user + ':' + DB_CONFIG.pass + '@' + DB_CONFIG.host +'/' + DB_CONFIG.db);

var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

// Models export

module.exports.FeedModel = FeedModel;
module.exports.UserModel = UserModel
