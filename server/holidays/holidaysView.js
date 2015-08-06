function HolidaysView () {
	this.returnHolidays = function (holidays) {
		return JSON.stringify(holidays);
	}

	return this;
}

module.exports = HolidaysView;