module.exports = function(app, passport) {
    require('./usersRoutes')(app, passport);
  return require('./feedsRoutes')(app);
};
