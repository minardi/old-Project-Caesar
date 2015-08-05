function ResourceTypesController (req, res) {
	var resourceTypesView = new require('./resourceTypesView')(),
		ResourceType = require('./resourceTypesModel'),
		db = new require('../db/db')(),
		actions = {
			'GET': get,
			'POST': create,
			'PUT': update,
			'DELETE': del
		},
		dbName = 'resourceTypes',
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


		db.create(dbName, resourceType.toJSON());
	}	

	function update () {
		var resourceType = new ResourceType(req.body);
		
		db.update(dbName, resourceType.toJSON(), id);
	}

	function del () {
		db.remove(dbName, id);
	};

	function responde (dbQuery) {
		m.unsubscribe(dbName + 'RequestHandeled', responde);
	
		res.send(resourceTypesView.returnResourceTypes(dbQuery));
	}

	return this;
}

module.exports = ResourceTypesController;