var fs = require('fs');

module.exports = {
    'port' : 5000,
    'secret' : 'secret',//process.env.PUB_ID_RSA_KEY || fs.readFileSync('../id_rsa_nuhome.pub'),
    'database' : process.env.MONGODB || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || '',

    'elasticsearch' : process.env.ELASTIC_HOST || '',
    'postgres': {},
    'facebookAuth': {
        'clientID':'',
        'clientSecret':'',
        'callbackURL':''
    },

    'googleAuth': {
        'clientID':'',
        'clientSecret':'',
        'callbackURL':''
    },

    'twitterAuth': {
        'clientID':'',
        'clientSecret':'',
        'callbackURL':''
    },

    'twilioOptions': {
        'twilioAccount_SID' : '',
        'twilioAuth_TOKEN' : ''
    },
    'twilioOptions': {
        'twilioAccount_SID' : '',
        'twilioAuth_TOKEN' : ''
    },

    'stripeOptions': {
        'stripeTEST_SK': process.env.STRIPE_KEY || '', //test aki token : if problem rehresh token
        'stripeTEST_PK' : process.env.STRIPE_PUB_KEY || '', //test aki token : if problem rehresh token
        'stripeLIVE_SK' : process.env.STRIPE_KEY || '',
        'stripeLIVE_PK': process.env.STRIPE_PUB_KEY || ''
    },//end of stripeOptions

    //for development use
    'dev': function(app) {
        if(app.get('env') === 'developement') {
            app.use(function(err, req, res, next) {
                res.status(err.status || 500);
                res.render('error',  {
                    message: err.message,
                    error: err
                });
            });
        }
    },
    //for production use
    'prod' : function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error',  {
            message: err.message,
            error: err
        });
    }
};
