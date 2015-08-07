(function (This) {
	This.Controller = function () {
		var views = {
				'schedule': new This.ScheduleView(),
				'events': new This.EventsView(),
				'full': new This.ScheduleEventsView(),
				'pager': new This.PagerView(),
				'download': new This.DownloadView()
			},
			$el = $('#main'),
			selectedEvent;

		start();

		function start () {
			setupMediator();
			showScheduleEvents();
			setupEvents();
		}
		
		function setupMediator () {
			cs.mediator.subscribe('ScheduleSelected', showSchedule);
			cs.mediator.subscribe('EventSelected', setupSelectedEvent);
			cs.mediator.subscribe('DiffWeekSelected', showWeek);
		}

		function showScheduleEvents () {
			views['full'].appendView('events', views['events'].render().el);
			views['full'].appendView('download', views['download'].render().el);

			views['full'].appendView('schedule', views['schedule'].render().el);
			views['full'].appendView('pager', views['pager'].render().el);
			
			views['schedule'].renderEvents();

			$el.append(views['full'].render().el);
		}

		function setupEvents () {
			collections.eventsCollection.on('update', updateEvents);
			collections.eventsCollection.on('change', updateEvents);
		}

		function updateEvents () {
			views['events'].remove();
			views['full'].appendView('events', views['events'].render().el);

			views['schedule'].remove();
			views['full'].appendView('schedule', views['schedule'].render().el);

			views['schedule'].renderEvents();
		}

		function showSchedule () {
			hideAll();
			views['full'].show();
		}

		function setupSelectedEvent (event) {
			selectedEvent = event;
			views['schedule'].setupSelectedEvent(event);
			views['schedule'].checkAvailableCells();
		}

		function showWeek (prevNumber) {
			views['schedule'].remove();
			views['schedule'].setDirection(prevNumber);
			views['full'].appendView('schedule', views['schedule'].render().el);

			views['schedule'].renderEvents();
			views['schedule'].setupSelectedEvent(selectedEvent);
		}

		function hideAll () {
			$('#main').children().addClass('hidden');
		}
	}
})(App.Schedule);