function HolidaysView () {
	this.returnHolidays = function (holidays, req) {
		var arrEvants = [];

		function checkCity (city) {
			if (city.locationCity === globalMan[req.cookies.clientId].locationCountry) {
				arrEvants.push(city);
			}
		}

		return JSON.stringify(holidays);
	}

	return this;
}

module.exports = HolidaysView;