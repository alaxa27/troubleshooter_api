var rek = require('rekuire')
    , log = rek('libs/log')(module);

var userHandlers = function() {
    this.getUsers = getUsers;
    this.getUser = getUser;
    this.updateUser = updateUser;
    this.createUser = createUser;
    log.info('User Handler set up.');
};
//
var getUsers = function(req, res) {
};

var getUser = function(req, res) {
};

var updateUser = function(req, res) {
};

var createUser = function(req, res) {
};

module.exports = userHandlers;
