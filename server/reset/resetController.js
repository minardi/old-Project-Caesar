function ResetController (req, res) {
	var events = require('./defaults/events.json'),
		resources = require('./defaults/resources.json'),
		counters = require('./defaults/counters.json'),
		db = require('../db/db'),
		defaultValues = {
			events: events, 
			resources:resources, 
			counters: counters
		};

	m.subscribe('resetCompleted', responde);

	db.reset(defaultValues);

	function responde (dbQuery) {
		m.unsubscribe('resetCompleted', responde);
	
		res.send("DBs successfully reseted!");
	}

	return this;
}

module.exports = ResetController;