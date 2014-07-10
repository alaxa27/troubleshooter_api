var rek = require('require')
    , log = rek('libs/log')(module)
    , UserModel = rek('db/mongoose.js').UserModel;
    
module.exports = function(app, passport) {
    
    //Return list of users with their profile infos
    app.get('/api/users', isAuthorized , function(req, res) {
        return UserModel.find(function(err, users) {
            if (!err) { //check here if client is logged as admin
                res.send(users);
            } else {
                log.error(err);
                res.send({error: err});
            }
        });
    });

    //Return the active user profile
    app.get('/api/users/profile', isAuthorized(1), function(req, res) {
        return res.send({'user': req.user});
    });

    //Handles the login credentials
    app.post('/api/users/signin', function(req, res) {

    });

    //Handles logOut
    app.get('/api/users/logout', function(req, res) {
        req.logout
        res.statusCode = 200;
        return res.send({ status: 'OK' });
    });

    //Handles the signup informations
    app.post('/api/users/signup', function(req, res) {

    });
}

var isAuthorized = function(req, res, next) {
    if (req.isAuthenticated()) {
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
