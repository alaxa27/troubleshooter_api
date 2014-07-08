var rek = require('rekuire')
    , log = rek('libs/log')(module)
    , mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , uniqueValidator = require('mongoose-unique-validator')
    , validate = require('mongoose-validate') //embedded validation rules, need to be enhanced
    , UserModel = rek('db/mongoose').UserModel;


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
    , author: [UserModel]
});

//Validation
//Here we need all validation rules for above schemes
//for instance: min length etc...

feedSchema.plugin(uniqueValidator); //Test if the entry is unique in db

var FeedModel = mongoose.model('FeedModel', feedSchema);
module.exports.FeedModel = FeedModel;
