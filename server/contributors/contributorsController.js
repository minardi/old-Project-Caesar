function ContributorsController (req, res) {
	var contributorsView = new require('./contributorsView')(),
		db = require('../db/db'),
		actions = {
			'GET': get,
			'POST': create,
			'PUT': update,
			'DELETE': del
		},
		dbName = 'contributors',
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
		res.send('This operation is not available for Contributors');
	}	

	function update () {
		res.send('This operation is not available for Contributors');
	}

	function del () {
		res.send('This operation is not available for Contributors');
	};

	function responde (dbQuery) {
		m.unsubscribe(dbName + 'RequestHandeled', responde);
		console.dir(contributorsView)
		res.send(contributorsView.returnContributors(dbQuery));
	}

	return this;
}

module.exports = ContributorsController;