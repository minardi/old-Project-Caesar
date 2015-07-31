(function (This) {
	This.Controller = function () {
		var views = {
				'schedule': new This.ScheduleView(),
				'events': new This.EventsView(),
				'full': new This.ScheduleEventsView()
			},
			scheduleCollection = new This.Schedule(),
			$el = $('#main');
			$el.addClass('schedule');

		start();

		function start () {
			setupMediator();
			initCollection();
			showScheduleEvents();
		}
		
		function initCollection () {
			scheduleCollection.push({
				'startDate': new Date(2015, 7, 27),
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
		}

		function setupMediator () {
			cs.mediator.subscribe('ScheduleSelected', showSchedule);
			cs.mediator.subscribe('EventSelected', setupSelectedEvent);
			cs.mediator.subscribe('NewSheduleItemCreated', pushtoSheduleCollection);
		}

		function showScheduleEvents () {
			views['full'].appendView('events', views['events'].render().el);
			views['full'].appendView('schedule', views['schedule'].render().el);
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

		function pushtoSheduleCollection (_weekNumber, dayNumber, timeline, eventId) {
			var rightWeek = scheduleCollection.findWhere({weekNumber: _weekNumber}),
				days = rightWeek.get('days');
				
			days[dayNumber] || (days[dayNumber] = {}); 
			days[dayNumber][timeline] || (days[dayNumber][timeline] = []); 
			days[dayNumber][timeline].push(eventId);
		}

		function hideAll () {
			$('#main').children().addClass('hidden');
		}
	}
})(App.Schedule);