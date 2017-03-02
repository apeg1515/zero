var express = require('express'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    apiRouter = express.Router(),
    _mainIndex  = 'public/index.html',
    _cmain = require('../config/main.js'),
    _auth = require('../controller/OAuth.js'),
    _redirects = require('../controller/redirects.js');

module.exports = function(app) {

    app.use(passport.initialize());
    require('../config/passport')(passport);

    apiRouter.get('/', function(req, res) {res.send(_mainIndex);});
    //redirects
    apiRouter.get('/login', _redirects.redirectLogin);
    apiRouter.get('/dashboard', _redirects.redirectDashboard);
    apiRouter.get('/register', _redirects.redirectRegister);
    apiRouter.get('/dashboard/profile', _redirects.redirectProfile);
    apiRouter.get('/dashboard/profile/user', _redirects.redirectProfileUser);
    apiRouter.get('/dashboard/profile/billing', _redirects.redirectProfileBilling);
    apiRouter.get('/dashboard/profile/notifications', _redirects.redirectProfileNotifications);
    apiRouter.get('/dashboard/profile/security', _redirects.redirectProfileSecurity);
    apiRouter.get('/dashboard/profile/saved', _redirects.redirectProfileSaved);
    apiRouter.get('/dashboard/profile/admin', _redirects.redirectProfileAdmin);
    apiRouter.get('/dashboard/form', _redirects.redirectForm);
    apiRouter.get('/dashboard/search', _redirects.redirectSearch);
    //register & pass token
    apiRouter.post('/authenticate-register', _auth.userRegister);
    apiRouter.post('/authenticate-login', _auth.userLogin);

    apiRouter.get('/test', passport.authenticate('jwt',{session: false}), function(req, res) {
        res.send({userId: req.user._id});
    });

    apiRouter.get('/dashboard-jwt', passport.authenticate('jwt', { session: false }), function(req, res) {
        res.send('It worked! User id is: ' + req.user._id + '.');
    });

    app.use('/', apiRouter);
};
