exports.EventsView = function () {
	
	this.returnEvents = function (events, req) {
		var Arr = [];
		
		function checkCity (city) {
			if(globalMan[req.cookies.clientId].role === "Admin") {
                Arr = events;
			} else if (city.city === globalMan[req.cookies.clientId].locationCity){
				Arr.push(city);
			}
			
		}
		
		if(req.method === "GET") {
		    events.forEach(function(item) {	
				checkCity(item)
		    });
			events = Arr;
		}
		return JSON.stringify(events);
	}

	return this;
}