(function (This) {
	This.Controller = function () {
		var mainView = new This.MainView(),
			$el = $('#main');
	
		start();

		function start () {
			setupMediator();
			mainView.setupEl($el);
			showScheduleEvents();
			setupEvents();
		}
		
		function setupMediator () {
			cs.mediator.subscribe('ScheduleSelected', showSchedule);
			cs.mediator.subscribe('EventSelected', setupSelectedEvent);
			cs.mediator.subscribe('DiffWeekSelected', showWeek);	
			cs.mediator.subscribe('WeekModeSelected', setupWeekMode);
			cs.mediator.subscribe('EventPreviewConflictsSelected', showPreviewConflicts);
			cs.mediator.subscribe('EventDeleted', checkAvailableCells);
			cs.mediator.subscribe('EventsCloned', showWeek);
		}

		function showScheduleEvents () {
			mainView.render();
		}

		function setupEvents () {
			collections.eventsCollection.on('update', updateEvents);
			collections.eventsCollection.on('change', updateEvents);
		}

		function updateEvents () {
			mainView.updateEvents();
		}

		function showSchedule () {
		 	hideAll();
		 	mainView.show();
		}

		function setupSelectedEvent (event) {
		 	mainView.setupSelectedEvent(event);
		}

		function showWeek (direction) {
			mainView.showWeek(direction);

		}

		function setupWeekMode (_mode) {
			mainView.setupWeekMode(_mode);
		}

		function showPreviewConflicts (event) {
			mainView.showPreviewConflicts(event);
		}

		function checkAvailableCells () {
			mainView.checkAvailableCells();
		}

		function hideAll () {
		 	$('#main').children().addClass('hidden');
		}
	}
})(App.Schedule);