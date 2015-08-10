function ResetController (req, res) {
	var db = new require('../db/db')(),
		defaultValues = {
			events: require('./defaults/events.json'),
			eventTypes: require('./defaults/eventTypes.json'),
			resources: require('./defaults/resources.json'),
			resourceTypes: require('./defaults/resourceTypes.json'),
			contributors: require('./defaults/contributors.json'),		
			weeks: require('./defaults/weeks.json'),
			accounts: require('./defaults/accounts.json'),
			holidays: require('./defaults/holidays.json'),
			counters: require('./defaults/counters.json'),
			cities: require('./defaults/cities.json')
		};

	db.reset(defaultValues, responde);

	function responde (err, result) {
		res.send("DBs successfully reseted!")
		console.log("DBs successfully reseted!");
	}

	return this;
}

module.exports = ResetController;