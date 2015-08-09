function AccountsController (req, res) {
	var accountsView = new require('./accountsView')(),
		Account = require('./AccountsModel'),
		db = new require('../db/db')(),
		actions = {
			'GET': get,
			'POST': (req.cookies.account.role === "Admin") ? create : get,
			'PUT': (req.cookies.account.role === "Admin") ? update : get,
			'DELETE': (req.cookies.account.role === "Admin") ? del : get
		},
		dbName = 'accounts',
		id = req.params.id;

	handle();

	function handle () {
		actions[req.method]();
	}

	function get () {
		db.fetch(dbName, responde);			
	}

	function create () {
		var account = new Account(req.body);

		db.create(dbName, account.toJSON(), responde);
	}	

	function update () {
		var account = new Account(req.body);
		
		db.update(dbName, account.toJSON(), id, responde);
	}

	function del () {
		db.remove(dbName, id, responde);
	};

	function responde (err, dbQuery) {	
		res.send(accountsView.returnAccount(dbQuery, req));
	}

	return this;
}

module.exports = AccountsController;