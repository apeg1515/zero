/*@
 *@@ Main Passport Config file for all Authentications
 *@Jwt Auth
 *@Local SignUp Auth
 *@Local SignIn Auth
 *@FB Auth
 *@GG Auth
 *@TW Auth
 */

var JwtStrategy = require('passport-jwt').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
//var LocalStrategy = require('passport-local').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var config = require('../config/main');
var jwt = require('jsonwebtoken');
User = require('../models/Users');


// Setup work and export for the JWT passport strategy
module.exports = function(passport) {

    passport.serializeUser(function(id, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //************ JWT AUTHENTICATION *************//
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;


    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));//end of new JwtStrategy


    //************ FACEBOOK AUTHENICATION *************//

    passport.use(new FacebookStrategy({

        clientID: config.facebookAuth.clientID,
        clientSecret: config.facebookAuth.clientSecret,
        callbackURL: config.facebookAuth.callbackURL
    },
        function(req, accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                //user is not logged in yet
               if(!req.user) {
                    User.findOne({'facebook.id': profile.id}, function(err, user) {

                        var token = jwt.sign(user, config.secret, {
                            expiresIn: 10080
                        });

                        if(err)
                            return done(err);
                        if(user) {
                            return done(null, token);
                        } else {
                            var newUser = new User();
                            newUser.facebook.id = profile.id;
                            newUser.facebook.token = accessToken;
                            newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                            newUser.facebook.email = profile.emails[0].value;

                            newUser.save(function(err) {
                                if(err)
                                    throw err;
                                var newToken = jwt.sign(newUser, config.secret, {expiresIn: 10080});
                                return done (null, newToken);
                            });
                        }
                    });

               } else {
                    // the user is already logged in and wants to merge social media account
                    var user = req.user;
                        user.facebook.id = profile.id;
                        user.facebook.token = accessToken;
                        user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                        user.facebook.email = profile.emails[0].value;

                        user.save(function(err) {
                            if(err)
                                throw err;
                            return done(null, user);
                        });
               }
            });
        }
    ));//end of FacebookStrategy()



    //************-- GOOGLE AUTHENICATION --*************//

    passport.use(new GoogleStrategy({

        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret,
        callbackURL: config.googleAuth.callbackURL,
        passReqToCallback: true
    },
        function(req, accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                if(!req.user) {
                    User.findOne({'google.id': profile.id}, function(err, user) {

                        if(err)
                            return done(err);
                        if(user) {
                            var token = jwt.sign(user, config.secret, {expiresIn: 10080});
                            return done(null, token);
                        } else {
                            var newUser = new User();
                            newUser.google.id = profile.id;
                            newUser.google.token = accessToken;
                            newUser.google.name = profile.displayName;
                            newUser.google.email = profile.emails[0].value;

                            newUser.save(function(err) {
                                if(err)
                                    throw err;
                                var newToken = jwt.sign(newUser, config.secret, {expiresIn: 10080});
                                return done(null, newToken);
                            });
                        }
                    });
                } else {
                    // the user is already logged in and wants to merge social media account
                    var user = req.user;
                    user.google.id = profile.id;
                    user.google.token = accessToken;
                    user.google.name = profile.displayName;
                    user.google.email = profile.emails[0].value;

                    user.save(function(err) {
                        if(err)
                            throw err;
                        return done(null, user);
                    });
                }
            });
        }
    ));//end of GoogleStrategy()


    //************-- TWITTE AUTHENICATION --*************//

    passport.use(new TwitterStrategy({

        consumerKey: config.twitterAuth.clientID,
        consumerSecret: config.twitterAuth.clientSecret,
        callbackURL: config.twitterAuth.callbackURL,
        passReqToCallback: true
    },
        function(req, accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                if(!req.user) {
                    User.findOne({'twitter.id': profile.id}, function(err, user) {
                        if(err)
                            return done(err);
                        if(user) {
                            var token = jwt.sign(user, config.secret, {expiresIn: 10080});
                            return done(null, token);
                        } else {
                            var newUser = new User();
                            newUser.google.id = profile.id;
                            newUser.google.token = accessToken;
                            newUser.google.name = profile.displayName;
                            newUser.google.email = profile.emails[0].value;

                            newUser.save(function(err) {
                                if(err)
                                    throw err;
                                var newToken = jwt.sign(newUSer, config.secret, {expiresIn: 10080});
                                return done(null, newToken);
                            });
                        }
                    });
                } else {
                    var user = req.user;
                    user.google.id = profile.id;
                    user.google.token = accessToken;
                    user.google.name = profile.displayName;
                    user.google.email = profile.emails[0].value;

                    user.save(function(err) {
                        if(err)
                            throw err;
                        return done(null, user);
                    });
                }
            });
        }
    ));//end of TwitterStrategy()


};//end of module.exports()
