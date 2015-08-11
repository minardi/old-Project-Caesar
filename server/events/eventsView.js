exports.EventsView = function () {
	
	this.returnEvents = function (events, req) {
		var Arr = [];
		
		// function checkCity (city) {
		// 	if(req.cookies.account.role === "Admin") {
		// 		if (city.location === req.cookies.account.locationCountry) {
		// 			Arr.push(city);
		// 		}
		// 	} else if (city.city === req.cookies.account.locationCity){
		// 		Arr.push(city);
		// 	}
			
		// }
		
		// if(req.method === "GET") {
		//     events.forEach(function(item) {	
		// 		checkCity(item)
		//     });
		// 	events = Arr;
		// }
		return JSON.stringify(events);
	}

	return this;
}