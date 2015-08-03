(function (This) {
	This.Controller = function () {
		var views = {
				'schedule': new This.ScheduleView(),
				'events': new This.EventsView(),
				'full': new This.ScheduleEventsView(),
				'pager': new This.PagerView()
			},
			scheduleCollection = new This.Schedule(),
			$el = $('#main');

		start();

		function start () {
			setupMediator();
			initCollection();
			showScheduleEvents();
		}
		
		function initCollection () {
			scheduleCollection.push({
				'startDate': new Date(2015, 7, 3),
				'days': {
					1: {
						'8:00': [1,2],
						'16:30': [3]
					},
					3: {
						'10:30': [2],
						'11:00': [2]
					}
				}
			});		
			scheduleCollection.push({
				'startDate': new Date(2015, 7, 10),
				'days': {
					1: {
						'18:00': [6],
						'16:30': [3]
					},
					5: {
						'10:30': [2],
						'11:00': [2]
					}
				}
			});		
		}

		function setupMediator () {
			cs.mediator.subscribe('ScheduleSelected', showSchedule);
			cs.mediator.subscribe('EventSelected', setupSelectedEvent);
			cs.mediator.subscribe('NextWeekSelected', showNextweek);
			cs.mediator.subscribe('PreviousWeekSelected', showPrevweek);
		}

		function showScheduleEvents () {
			views['full'].appendView('events', views['events'].render().el);
			views['full'].appendView('schedule', views['schedule'].render().el);
			views['full'].appendView('pager', views['pager'].render().el);
			
			views['schedule'].renderEvents(scheduleCollection);

			$el.append(views['full'].render().el);
		}

		function showSchedule () {
			hideAll();
			views['full'].show();
		}

		function setupSelectedEvent (event) {
			views['schedule'].setupSelectedEvent(event);
		}

		function showNextweek (nextNumber) {
			views['schedule'].remove();
			views['schedule'].setDirection(nextNumber);
			views['full'].appendView('schedule', views['schedule'].render().el);

			views['schedule'].renderEvents(scheduleCollection);
		}

		function showPrevweek (prevNumber) {
			views['schedule'].remove();
			views['schedule'].setDirection(prevNumber);
			views['full'].appendView('schedule', views['schedule'].render().el);

			views['schedule'].renderEvents(scheduleCollection);
		}

		function hideAll () {
			$('#main').children().addClass('hidden');
		}
	}
})(App.Schedule);