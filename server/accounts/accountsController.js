function AccountsController (req, res) {
	var accountsView = new require('./accountsView')(),
		Account = require('./AccountsModel'),
		db = new require('../db/db')(),
		actions = {
			'GET': get,
			'POST': create,
			'PUT': update,
			'DELETE': del
		},
		dbName = 'accounts',
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
		var account = new Account(req.body);

		db.create(dbName, account.toJSON());
	}	

	function update () {
		var account = new Account(req.body);
		
		db.update(dbName, account.toJSON(), id);
	}

	function del () {
		db.remove(dbName, id);
	};

	function responde (dbQuery) {
		m.unsubscribe(dbName + 'RequestHandeled', responde);
	
		res.send(accountsView.returnAccount(dbQuery));
	}

	return this;
}

module.exports = AccountsController;