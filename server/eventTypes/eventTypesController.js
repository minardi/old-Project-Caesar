function EventTypesController (req, res) {
	var eventTypesView = new require('./eventTypesView')(),
		EventType = require('./eventTypesModel'),
		db = new require('../db/db')(),
		actions = {
			'GET': get,
			'POST': create,
			'PUT': update,
			'DELETE': del
		},
		dbName = 'eventTypes',
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
		var eventType = new EventType(req.body);

		db.create(dbName, eventType.toJSON());
	}	

	function update () {
		var eventType = new EventType(req.body);
		
		db.update(dbName, eventType.toJSON(), id);
	}

	function del () {
		db.remove(dbName, id);
	};

	function responde (dbQuery) {
		m.unsubscribe(dbName + 'RequestHandeled', responde);
	
		res.send(eventTypesView.returnEventTypes(dbQuery));
	}

	return this;
}

module.exports = EventTypesController;