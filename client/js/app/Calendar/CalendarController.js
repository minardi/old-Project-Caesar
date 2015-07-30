(function (This) {
	This.Controller = function () {
		var views = {
				'shedule': new This.ScheduleView(),
				'events': new This.EventsView(),
				'full': new This.ScheduleEventsView()
		//		'addView': new This.AddEventView()
			},
			collections = {
				'events': new App.Events.EventCollection(), 
				'schedule': new This.Schedule()
			},
			$el = $('#main');

		loadCollections();

		function start () {
			setupMediator();
		}
		
		
		function setupMediator () {
			cs.mediator.subscribe('ScheduleSelected', showScheduleEvents);
			//cs.mediator.subscribe('CollectionLoaded', showCalendar);
			//cs.mediator.subscribe('CurrentWeekSelected', showEvents);
			//cs.mediator.subscribe('EventSelected', setupSelectedEvent);
			//cs.mediator.subscribe('EvendAdded', showUpdatedEvents);
		}

		function loadCollections() {	
			collections['events'].listenTo(collections['events'], 'sync', start);	
			collections['schedule'].push({
				'startDate': new Date(2015, 7, 27),
					'Monday': {
							'7:00': [1,2],
							'8:30': [2]
					}, 
					'Tuesday': {
							'10:30': [2],
							'11:00': [2]
						}		
			});		
			collections['events'].fetch();
		}

		function showScheduleEvents () {
			views['events'].setCollection(collections['events']);

			console.log(collections['events'].length);

			views['full'].appendView('events', views['events'].render().el);
			$el.html(views['full'].render().el);
		}
	}
})(App.Schedule);