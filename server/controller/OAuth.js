var config = require('../config/main');
var jwt = require('jsonwebtoken');
User = require('../models/Users');

module.exports.userRegister = function(req, res) {
    if(!req.body.email ||
       !req.body.password ||
       !req.body.fname ||
       !req.body.lname ||
       !req.body.state ||
       !req.body.password ||
       !req.body.city ||
       !req.body.zip ||
       !req.body.street
       ) {
        res.json({success: false, message: 'please make sure you filled out everything.'});
    } else {
        var newUser = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password,
            active: 'no',
            role: 'user',
            phone: req.body.phone,
            address: {
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip
            }
        });
        //save new user
        newUser.save(function(err) {
            if(err) {
                return res.json({success: false, message: 'that email is already in use'});
            }
            res.json({success: true, message: 'your account has now been created!'});
        });
    }

};

module.exports.userLogin = function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.send({ success: false, message: 'Authentication failed. User not found.' });
        } else {
            // Check if password matches
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    // Create token if the password matched and no error was thrown
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 10080 // in seconds
                    });
                    res.json({ success: true, email:  req.body.email, token: 'JWT ' + token });
                } else {
                    res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
                }
            });
        }
    });
};

