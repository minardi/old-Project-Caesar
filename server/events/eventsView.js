exports.EventsView = function () {
	
	this.returnEvents = function (events) {
		return JSON.stringify(events);
	}

	return this;
}