var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , uniqueValidator = require('mongoose-unique-validator')
    , validate = require('mongoose-validate');


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
    title: { type: String, required: true , validate: [validate.alphanumeric, 'Invalid title']}
    , content: { type: String, required: true , validate: [validate.alphanumeric, 'Invalid content']}
    , created: { type: Date, default: Date.now }
    , modified: { type: Date, default: Date.now }
    , images: [imageSchema]
    , videos: [videoSchema]
    author: [userSchema]
});

//Validation

feedSchema.plugin(uniqueValidator);

var FeedModel = mongoose.model('FeedModel', feedSchema);
module.exports.FeedModel = FeedModel;
