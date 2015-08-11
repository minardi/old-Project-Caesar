function HolidaysView () {
	this.returnHolidays = function (holidays, req) {
		var Arr = [];
		
		function checkCity (city) {
			if (city.location === globalMan[req.cookies.clientId].locationCountry) {
				Arr.push(city);
			}
		}
		
		if(req.method === "GET") {
		    holidays.forEach(function(item) {	
				checkCity(item)
		    });
			holidays = Arr;
		}
		return JSON.stringify(holidays);
	}

	return this;
}

module.exports = HolidaysView;