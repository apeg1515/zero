var fs = require('fs');

module.exports = {
    'port' : 5000,
    'secret' : 'secret',//process.env.PUB_ID_RSA_KEY || fs.readFileSync('../id_rsa_nuhome.pub'),
    'database' : process.env.MONGODB || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017/mainDatabase',

    'elasticsearch' : process.env.ELASTIC_HOST || 'http://localhost:9200',

    'facebookAuth': {
        'clientID':'1507674365913123',
        'clientSecret':'634f2a3fd6819ed2efdbee06eaa41e64',
        'callbackURL':'http://localhost:3001/auth/facebook/callback'
    },

    'googleAuth': {
        'clientID':'273757700633-1pti7halvflbhordbn3feeirh7rhr9qa.apps.googleusercontent.com',
        'clientSecret':'dDpz4t2ELSoPwAKjUOfCxfcK',
        'callbackURL':'http://localhost:3001/auth/google/callback'
    },

    'twitterAuth': {
        'clientID':'Ju9ksRX0epdgjRIMeurzx8Pif',
        'clientSecret':'Q4Kbt1dlANAsvfvAhEKv9LDtI1zpP14BzFshCanu6hDPMXlRpa',
        'callbackURL':'http://localhost:3001/auth/twitter/callback'
    },

    'twilioOptions': {
        'twilioAccount_SID' : 'AC33fa18b47131db5a73fbf75996ec3a2d',
        'twilioAuth_TOKEN' : '2b38a510019106b9c0aac595e8b4eaa9'
    },
    'twilioOptions': {
        'twilioAccount_SID' : 'AC33fa18b47131db5a73fbf75996ec3a2d',
        'twilioAuth_TOKEN' : '2b38a510019106b9c0aac595e8b4eaa9'
    },

    'stripeOptions': {
        'stripeTEST_SK': process.env.STRIPE_KEY || 'sk_test_cMR1IF5RNRnmhx3CXlsCxAci', //test aki token : if problem rehresh token
        'stripeTEST_PK' : process.env.STRIPE_PUB_KEY || 'pk_test_bOJMT9iNMflBDPmRaP2X2OHX', //test aki token : if problem rehresh token
        'stripeLIVE_SK' : process.env.STRIPE_KEY || 'sk_live_HscmaH5htTHIPEWWJhPulQ1p',
        'stripeLIVE_PK': process.env.STRIPE_PUB_KEY || 'pk_live_E2ZlyNdFsJOFyvf29Rg8hUhi'
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
