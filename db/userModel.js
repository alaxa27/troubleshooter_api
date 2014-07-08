var mongoose = require('mongoose')
    , rek = require('rekuire')
    , log = rek('libs/log')(module)
    , Schema = mongoose.Schema
    , uniqueValidator = require('mongoose-unique-validator')
    , validate = require('mongoose-validate'); //embedded validation rules, need to be enhanced

//Schema
//Here we need the final schemes for linking user accounts

var userSchema = new Schema({
    email: { type: String, required: true, validate: [validate.email, 'Invalid email adress'] }
    , password : { type: String, required: true }
});

//Validation
//Here we need all validation rules for above schemes
//for instance: min length etc...

userSchema.plugin(uniqueValidator); //Test if the entry is unique in db

var UserModel = mongoose.model('UserModel', userSchema);
module.exports.UserModel = UserModel;
