module.exports.redirectDashboard = function(req, res) {
    res.redirect('http://localhost:9000/#!/dashboard');
};
module.exports.redirectLogin = function(req, res) {
    res.redirect('http://localhost:9000/#!/login');
};
module.exports.redirectRegister = function(req, res) {
    res.redirect('http://localhost:9000/#!/register');
};
//profile
module.exports.redirectProfile = function(req, res) {
    res.redirect('http://localhost:9000/#!/dashboard/profile');
};
module.exports.redirectProfileUser = function(req, res) {
    res.redirect('http://localhost:9000/#!/dashboard/profile/user');
};
module.exports.redirectProfileBilling = function(req, res) {
    res.redirect('http://localhost:9000/#!/dashboard/profile/billing');
};
module.exports.redirectProfileNotifications = function(req, res) {
    res.redirect('http://localhost:9000/#!/dashboard/profile/notifications');
};
module.exports.redirectProfileSecurity = function(req, res) {
    res.redirect('http://localhost:9000/#!/dashboard/profile/security');
};
module.exports.redirectProfileSaved = function(req, res) {
    res.redirect('http://localhost:9000/#!/dashboard/profile/saved');
};
module.exports.redirectProfileAdmin = function(req, res) {
    res.redirect('http://localhost:9000/#!/dashboard/profile/admin');
};
module.exports.redirectForm = function(req, res) {
    res.redirect('http://localhost:9000/#!/dashboard/form');
};
module.exports.redirectSearch = function(req, res) {
    res.redirect('http://localhost:9000/#!/dashboard/search');
};

