var mongoose    = require('mongoose');

var db = mongoose.connection;

var Schema = mongoose.Schema;

//Schemas
//

var imageSchema = new Schema({
    kind: {
        type: String,
        enumerate: ['main', 'description'],
        required: true
    },
    url: { type: String, required: true }
});

var videoSchema = new Schema({
    url: { type: String, required: true }
});

var feedSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    created: { type: Date, default: Date.now },
    modified: { type: Date, default: Date.now },
    images: [imageSchema],
    videos: [videoSchema],
    author: [userSchema]
});

var FeedModel = mongoose.model('FeedModel', feedSchema);

module.exports.FeedModel = FeedModel;
