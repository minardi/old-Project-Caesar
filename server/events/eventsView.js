exports.EventsView = function () {
	
	this.returnEvents = function (events, req) {
		var Arr = [];
		
		function checkCity (city) {
			if(globalMan[req.cookies.clientId].role === "Admin") {
                Arr = events;
			} else if (city.city === globalMan[req.cookies.clientId].locationCity){
				Arr.push(city);
			}
		return JSON.stringify(events);
	}

	return this;
}