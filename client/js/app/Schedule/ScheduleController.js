(function (This) {
	This.Controller = function () {
		var views = {
				'schedule': new This.ScheduleView(),
				'events': new This.EventsView(),
				'full': new This.ScheduleEventsView(),
				'pager': new This.PagerView(),
				'download': new This.DownloadView(),
				'mode': new This.WeekModeView(),
				'clone': new This.CloneEventsView()
			},
			$el = $('#main'),
			$table,
			mode = 'allEvents',
			selectedEvent;

		start();

		function start () {
			setupMediator();
			showScheduleEvents();
			setupEvents();

			$table = views['schedule'].getElement();

			views['mode'].setTableEl($table);
			views['clone'].setTableEl($table);
		}
		
		function setupMediator () {
			cs.mediator.subscribe('ScheduleSelected', showSchedule);
			cs.mediator.subscribe('EventSelected', setupSelectedEvent);
			cs.mediator.subscribe('DiffWeekSelected', showWeek);	
			cs.mediator.subscribe('WeekModeSelected', setupWeekMode);
			cs.mediator.subscribe('EventPreviewConflictsSelected', showPreviewConflicts);
			cs.mediator.subscribe('EventDeleted', checkAvailableCells);


		}

		function showScheduleEvents () {
			views['full'].appendView('events', views['events'].render().el);
			views['full'].appendView('download', views['download'].render().el);
			
			views['full'].appendView('weekMode', views['mode'].render().el);
			views['full'].appendView('clone', views['clone'].render().el);

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
			views['mode'].setupSelectedEvent(event);
			views['schedule'].checkAvailableCells();

			if (mode === 'allEvents') {
				views['mode'].showAllEvents();
			} else {
				views['mode'].showSelectedEvent();
				
			};
		}

		function showWeek (prevNumber) {
			views['schedule'].remove();
			views['schedule'].setDirection(prevNumber);
			views['full'].appendView('schedule', views['schedule'].render().el);

			views['schedule'].renderEvents();
			views['schedule'].setupSelectedEvent(selectedEvent);

			$table = views['schedule'].getElement();

			views['clone'].setTableEl($table);

		}

		function setupWeekMode (_mode) {
			mode = _mode;

			if (mode === 'allEvents') {
				views['mode'].showAllEvents();
			} else {
				views['mode'].setupSelectedEvent(selectedEvent);
				views['mode'].showSelectedEvent();
			};
			views['schedule'].checkAvailableCells();
		}

		function showPreviewConflicts (event) {
			$('.conflictCell').remove();
			views['schedule'].checkAvailableCells(event);
		}

		function checkAvailableCells () {
			views['schedule'].checkAvailableCells();
		}

		function hideAll () {
			$('#main').children().addClass('hidden');
		}
	}
})(App.Schedule);