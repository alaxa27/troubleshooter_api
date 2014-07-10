var mongoose = require('mongoose')
    , rek = require('rekuire')
    , bcrypt = require('bcrypt-nodejs')
    , log = rek('libs/log')(module)
    , Schema = mongoose.Schema
    , uniqueValidator = require('mongoose-unique-validator')
    , validate = require('mongoose-validate'); //embedded validation rules, need to be enhanced

//Schema
//Here we need the final schemes for linking user accounts

var userSchema = new Schema({

    local            : {
        email        : { type: String, required: true, validate: [validate.email, 'Invalid email adress'] },
        password     : { type: String, required: true },
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

//Validation
//Here we need all validation rules for above schemes
//for instance: min length etc...

userSchema.plugin(uniqueValidator); //Test if the entry is unique in db

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

//Creating and exporting UserModel based on userSchema
var UserModel = mongoose.model('UserModel', userSchema);
module.exports.UserModel = UserModel;
