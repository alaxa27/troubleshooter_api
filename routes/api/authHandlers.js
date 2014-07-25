var rek = require('rekuire')
    , log = rek('libs/log')(module)
    , passport = require('passport');

var authHandlers = function() {
    this.googleSignIn = googleSignIn;
    this.googleSignInCallback = googleSignInCallback;
    this.facebookSignIn = facebookSignIn;
    this.facebookSignInCallback = facebookSignInCallback;
    this.localSignIn = localSignIn;
    this.localSignInCallback = localSignInCallback;
    log.info('Auth Handler set up.');
};
//////
var googleSignIn = function(req, res) {
};

var googleSignInCallback = function(req, res) {
};

var facebookSignIn = function(req, res) {
};

var facebookSignInCallback = function(req, res) {
};

var localSignIn = function(req, res) {
};

var localSignInCallback = function(req, res) {
};

module.exports = authHandlers;

