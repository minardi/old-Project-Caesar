function ResetController (req, res) {
	var events = require('./defaults/events.json'),
		eventTypes = require('./defaults/eventTypes.json'),
		resources = require('./defaults/resources.json'),
		resourceTypes = require('./defaults/resourceTypes.json'),
		contributors = require('./defaults/contributors.json'),		
		weeks = require('./defaults/weeks.json'),
		accounts = require('./defaults/accounts.json'),
		counters = require('./defaults/counters.json'),
		holidays = require('./defaults/holidays.json'),
		db = new require('../db/db')(),
		defaultValues = {
			events: events, 
			eventTypes: eventTypes,
			resources:resources, 
			resourceTypes: resourceTypes,
			contributors: contributors,
			accounts: accounts,
			weeks: weeks,
			holidays: holidays,
			counters: counters
		};

	db.reset(defaultValues, responde);

	function responde (err, result) {
		res.redirect('/Events');
		
		console.log("DBs successfully reseted!");
	}

	return this;
}

module.exports = ResetController;