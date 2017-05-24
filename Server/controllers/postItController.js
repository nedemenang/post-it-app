const register_new_user = require('../Routes/register_new_user');

module.exports = function(app) {
	app.post('/users/signup', function (req, res){
		register_new_user(req, res);
	});

}