(function (This) {
    This.Schedule = Backbone.Model.extend({
        url: '/weeks',

        update: function (options) {
	    	var $cell = options.$cell,
	            eventId = options.id,
	            week = options.week,
	            day = $cell[0].dataset.day,
	            interval = $cell[0].dataset.interval,
	            weekExists = Boolean(this.attributes[week]),
	            dayExists = Boolean(weekExists && this.attributes[week][day]),
	            intervalExists = Boolean(dayExists && this.attributes[week][day][interval] !== undefined);

	        if (intervalExists) {
	        	this.attributes[week][day][interval].push(eventId);
	        } else if (dayExists){
	        	this.attributes[week][day][interval] = [eventId];
	        } else if (weekExists) {
	        	this.attributes[week][day] = {};
	        	this.attributes[week][day][interval] = [eventId]

	        } else {
	        	this.attributes[week] = {};
	        	this.attributes[week][day] = {};
	        	this.attributes[week][day][interval] = [eventId];

	        }

	        // save to server here!!!

        }
    });
})(App.Schedule);
