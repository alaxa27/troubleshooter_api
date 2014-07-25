var rek = require('rekuire')
    , log = rek('libs/log')(module)
    , UserModel = rek('db/mongoose.js').UserModel;
    
module.exports = function(app, passport) {
    
    //Return list of user with their profile infos
var getUsersList = function(req, res) {
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
 function(req, res) {
        return res.send({'email': req.user.email
                        , 'password': req.user.password
        });
    });

    //Handles the login credentials
 function(req, res) {

    });

    //Handles logOut
    app.get('/user/logout', function(req, res) {
        req.logout
        res.statusCode = 200;
        return res.send({ status: 'OK' });
    });

    // Process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
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
