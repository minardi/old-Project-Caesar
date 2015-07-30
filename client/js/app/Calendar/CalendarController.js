(function (This) {
	This.Controller = function () {
		var view = new This.CalendarEventsView(),
			$el = $('#main');

		setupMediator();
		
		function setupMediator () {
			cs.mediator.subscribe('CollectionLoaded', showCalendar);
			cs.mediator.subscribe('CurrentWeekSelected', showEvents);
			cs.mediator.subscribe('EventSelected', setupSelectedEvent);
			cs.mediator.subscribe('EvendAdded', showUpdatedEvents);

		}

		function showCalendar (collection) {
			view.calendarView.setCollection(collection);

			$el.html(view.render().el);
			view.showEvents();
		}

		function showEvents (week) {
			view.calendarView.showEvents(week);
		}

		function setupSelectedEvent (event) {
			view.calendarView.setupSelectedEvent(event);
		}

		function showUpdatedEvents (collection) {
			view.calendarView.setCollection(collection);
			view.calendarView.setCollection(view.eventsView.collection);
			view.showEvents();
		}
	}
})(App.Calendar);