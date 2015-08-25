function AccountsController (req, res) {
	var accountsView = new require('./accountsView')(),
		Account = require('./AccountsModel'),
		db = new require('../db/db')(),
		actions = {
			'GET': get,
			'POST': (globalMan[req.cookies.clientId].role === "Admin") ? create : get,
			'PUT': (globalMan[req.cookies.clientId].role === "Admin") ? update : get,
			'DELETE': (globalMan[req.cookies.clientId].role === "Admin") ? del : get
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

		db.IsUniqueLogin( req.body.login , function (err, result) {
			if (!result) {
				db.create(dbName, account.toJSON(), responde);
			} else {
				res.status(201).send('Sorry, login already exists!');
			}
		});
	}	

	function update () {
		var account = new Account(req.body);
		db.IsUniqueLogin( req.body.login , function (err, result) {
			if (!result) {
				db.update(dbName, account.toJSON(), id, responde);
			} else {
				res.status(201).send('Sorry, login already exists!');
			}
		});
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