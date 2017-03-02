var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
         type: String, required: true
     },
    role: {
        type: String,
        enum: ['user', 'client', 'manager', 'admin'],
        default: 'user'
    },
    phone: {
        type: String,
        required: true
    },
    address: {
         street: String,
         city: String,
         state: {abr: String, name: String},
         zip: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    google: {
         id: String,
         token: String,
         email: String,
         name: String
    },
    twitter: {
        id: String,
        token: String,
        email: String,
        name: String
    }
});

//save user's password hashed
UserSchema.pre('save', function(next) {
    var user= this;
    if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if(err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

//create method to compare passwords
UserSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.UserfindOne = function(id,callback) {
    User.findOne(id,callback);
};

