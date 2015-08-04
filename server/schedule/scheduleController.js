function ScheduleController (req, res) {
	var scheduleView = new require('./scheduleView')(),
		ScheduleWeek = require('./scheduleModel'),
		db = new require('../db/db')(),
		actions = {
			'GET': get,
			'POST': create,
			'PUT': update,
			'DELETE': del
		},
		dbName = 'schedule',
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
		var scheduleWeek = new ScheduleWeek(req.body);

		db.create(dbName, scheduleWeek.toJSON());
	}	

	function update () {
		var scheduleWeek = new ScheduleWeek(req.body);
		
		db.update(dbName, scheduleWeek.toJSON(), id);
	}

	function del () {
		db.remove(dbName, id);
	};

	function responde (dbQuery) {
		m.unsubscribe(dbName + 'RequestHandeled', responde);
	
		res.send(scheduleView.returnSchedule(dbQuery));
	}

	return this;
}

module.exports = ScheduleController;