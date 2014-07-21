var rek = require('rekuire')
    , log = rek('libs/log')(module)
    , UserModel = rek('db/mongoose.js').UserModel;
    
module.exports = function(app, passport) {
    
    //Return list of user with their profile infos
    app.get('/user/list', isAuthorized , function(req, res) {
        return UserModel.find(function(err, user) {
            if (!err) { //check here if client is logged as admin
                res.send(user);
            } else {
                log.error(err);
                res.send({error: err});
            }
        });
    });

    //Return the active user profile
    app.get('/user/me', isAuthorized, function(req, res) {
        return res.send({'email': req.user.email
                        , 'password': req.user.password
        });
    });

    //Handles the login credentials
    app.post('/user/signin', function(req, res) {

    });

    //Handles logOut
    app.get('/user/logout', function(req, res) {
        req.logout
        res.statusCode = 200;
        return res.send({ status: 'OK' });
    });

    //Handles the signup informations
    app.post('/user/signup', function(req, res) {

    });
}

var isAuthorized = function(req, res, next) {
    if (req.user) {
/*
        //Checks if user has the rights to continue
        if (user.rights.level >= levelRequired) {
            return next();
        } else {
            return res.send({'error': 'Not authorizes'});
        }
*/
        return next();
    } else {
        return res.send({'error': 'Not authenticated'});
    }
};
