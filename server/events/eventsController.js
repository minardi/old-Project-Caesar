function EventsController (req, res) {
	var view = require('./eventsView'),
		Event = require('./eventsModel').EventsModel,
		db = require('../db/db'),
		eventsView = new view.EventsView(),
		actions = {
			'GET': get,
			'POST': create,
			'PUT': update,
			'DELETE': del
		},
		dbName = 'events',
		id = req.params.id;

	m.subscribe(dbName + 'RequestHandeled', responde);

	handle();

	function handle () {
		var event = new Event(req.body);

		actions[req.method](event);
	}

	function get (event) {
		db.fetch(dbName);			
	}

	function create (event) {
		db.create(dbName, event.toJSON());
	}	

	function update (event) {
		db.update(dbName, event.toJSON(), id);
	}

	function del (event) {
		db.remove(dbName, id);
	};

	function responde (dbQuery) {
		m.unsubscribe(dbName + 'RequestHandeled', responde);
	
		res.send(eventsView.returnEvents(dbQuery));
	}

	return this;
}

module.exports = EventsController;