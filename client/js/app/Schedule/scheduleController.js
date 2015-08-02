'use strict';

(function (This) {
    This.scheduleController = function () {
        var weeks = new This.Weeks(weeksDb),
            scheduleView = new This.ScheduleView({collection: weeks, event: cs.events.get('0')}),
            $schedule = $('#main');

        start();

        function start () {
            setUpMediator();

            $schedule.append((scheduleView.render().el));
        }

        function setUpMediator () {
            cs.mediator.subscribe('scheduleCellMatched', addEventToScheduleGrid);
            cs.mediator.subscribe('eventScheduled', updateSchedule);
            
        }

        function hideAll () {
            $schedule.children().addClass('hidden');
        }

        function addEventToScheduleGrid (options) {
            var $cell = options.$el,
                eventId = options.id,
                event = cs.events.get(eventId),
                eventInSchedule = new App.Events.ScheduleCellView({
                    model: event, 
                    scheduledEvent: options.event
                });

                $cell.append(eventInSchedule.render().el);
        }

        function updateSchedule (options) {
            schedule.update(options)
        }

        return this;
    }
})(App.Schedule);