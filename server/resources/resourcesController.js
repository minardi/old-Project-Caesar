function ResourcesController (req, res) {
	var view = require('./resourcesView'),
		Resource = require('./resourcesModel').ResourcesModel,
		db = require('../db/db'),
		resourcesView = new view.ResourcesView(),
		actions = {
			'GET': get,
			'POST': create,
			'PUT': update,
			'DELETE': del
		},
		dbName = 'resources',
		id = req.params.id;

	m.subscribe(dbName + 'RequestHandeled', responde);

	handle();

	function handle () {
		var resource = new Resource(req.body);
						
		actions[req.method](resource);
	}

	function get (resource) {
		db.fetch(dbName);			
	}

	function create (resource) {
		db.create(dbName, resource.toJSON());
	}	

	function update (resource) {
		db.update(dbName, resource.toJSON(), id);
	}

	function del (resource) {
		db.remove(dbName, id);
	};

	function responde (dbQuery) {
		m.unsubscribe(dbName + 'RequestHandeled', responde);
	
		res.send(resourcesView.returnResources(dbQuery));
	}

	return this;
}

module.exports = ResourcesController;