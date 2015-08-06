function UsersController (req, res) {
	var usersView = new require('./usersView')(),
		User = require('./userModel'),
		db = new require('../db/db')(),
		actions = {
			'GET': get,
			'POST': create,
			'PUT': update,
			'DELETE': del
		},
		dbName = 'users',
		id = req.params.id;

	handle();

	function handle () {
		actions[req.method]();
	}

	function get () {
		db.fetch(dbName, responde);			
	}

	function create () {
		var user = new User(req.body);

		db.create(dbName, user.toJSON(), responde);
	}	

	function update () {
		var user = new User(req.body);
		
		db.update(dbName, user.toJSON(), id, responde);
	}

	function del () {
		db.remove(dbName, id, responde);
	};

	function responde (err, dbQuery) {
		res.send(usersView.returnUser(dbQuery));
	}

	return this;
}

module.exports = UsersController;