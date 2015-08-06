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

	m.subscribe(dbName + 'RequestHandeled', responde);

	handle();

	function handle () {
		actions[req.method]();
	}

	function get () {
		db.fetch(dbName);			
	}

	function create () {
		var user = new User(req.body);

		db.create(dbName, user.toJSON());
	}	

	function update () {
		var user = new User(req.body);
		
		db.update(dbName, user.toJSON(), id);
	}

	function del () {
		db.remove(dbName, id);
	};

	function responde (dbQuery) {
		m.unsubscribe(dbName + 'RequestHandeled', responde);
	
		res.send(usersView.returnUser(dbQuery));
	}

	return this;
}

module.exports = UsersController;