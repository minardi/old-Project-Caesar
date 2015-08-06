function HolidaysController (req, res) {
	var holidaysView = new require('./holidaysView')(),
		Holiday = require('./holidaysModel'),
		db = new require('../db/db')(),
		actions = {
			'GET': get,
			'POST': create,
			'PUT': update,
			'DELETE': del
		},
		dbName = 'holidays',
		id = req.params.id;

	m.subscribe(dbName + 'RequestHandeled', responde);

	handle();

	function handle () {
		var holiday = new Holiday(req.body);

		actions[req.method](holiday);
	}

	function get (holiday) {
		db.fetch(dbName);			
	}

	function create (holiday) {
		db.create(dbName, holiday.toJSON());
	}	

	function update (holiday) {
		db.update(dbName, holiday.toJSON(), id);
	}

	function del (holiday) {
		db.remove(dbName, id);
	};

	function responde (dbQuery) {
		m.unsubscribe(dbName + 'RequestHandeled', responde);
	
		res.send(holidaysView.returnHolidays(dbQuery));
	}

	return this;
}

module.exports = HolidaysController;