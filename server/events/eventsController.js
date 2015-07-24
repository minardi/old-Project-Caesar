function EventsController (req, res) {
	var view = require('./eventsView'),
		Event = require('./eventsModel').EventsModel,
		eventsView = new view.EventsView();

	m.subscribe('eventsRequestHandeled', responde);

	handle();

	function handle () {
		var event = new Event(req);
	}

	function responde (dbQuery) {
		m.unsubscribe('eventsRequestHandeled', responde);
	
		res.send(eventsView.returnEvents(dbQuery));
	}

	return this;
}

module.exports = EventsController;