function ResetController (req, res) {
	var events = require('./defaults/events.json'),
		eventTypes = require('./defaults/eventTypes.json'),
		resources = require('./defaults/resources.json'),
		resourceTypes = require('./defaults/resourceTypes.json'),
		contributors = require('./defaults/contributors.json'),		
		schedule = require('./defaults/schedule.json'),
		users = require('./defaults/users.json'),
		counters = require('./defaults/counters.json'),
		db = new require('../db/db')(),
		defaultValues = {
			events: events, 
			eventTypes: eventTypes,
			resources:resources, 
			resourceTypes: resourceTypes,
			contributors: contributors,
			users: users,
			schedule: schedule,
			counters: counters
		};

	m.subscribe('resetCompleted', responde);

	db.reset(defaultValues);

	function responde () {
		m.unsubscribe('resetCompleted', responde);
	
		res.redirect('/Events');
		
		console.log("DBs successfully reseted!");
	}

	return this;
}

module.exports = ResetController;