var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , uniqueValidator = require('mongoose-unique-validator')
    , validate = require('mongoose-validate');

//Schemas

var userSchema = new Schema({
    email: { type: String, required: true, validate: [validate.email, 'Invalid email adress'] }
    , password : { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

var UserModel = mongoose.model('UserMOdel', userSchema);
module.exports.UserModel = UserModel;
