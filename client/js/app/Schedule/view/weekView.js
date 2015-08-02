'use strict';
(function (This) {
    This.WeekView = Backbone.View.extend({
        tpl: _.template(weekTpl),
		
		events: {
            'click td:not(td:nth-child(1))': 'scheduleEvent'
        },
		
        initialize: function (options) {
            this.weekNumber = options.weekNumber;

            this.scheduledEvent = options.event;
        },

        render: function () {
            this.$el.html(this.tpl({
                days:this.model.toJSON(), 
                weekNumber: this.weekNumber,
                eventName: this.scheduledEvent.get('name')
            }));

            this.placeConflicts();

            return this;
        },

        placeConflicts: function () {
            var $cells = this.$('.grid-cell'),
                days = this.model.attributes;

            _.each($cells, function (cell, i) {
                var day = cell.dataset.day,
                    interval = cell.dataset.interval,
                    eventIds = days[day] && days[day][interval];

                _.each(eventIds, function (eventId) {
                    cs.mediator.publish('scheduleCellMatched', {
                        $el: $(cell),
                        event: this.scheduledEvent, 
                        id: eventId
                    });
                }, this);                      
            }, this);
        },

        scheduleEvent: function (e) {
            var $cell = $(e.currentTarget),
                eventId = this.scheduledEvent.get('id');

            if (!$cell.children().hasClass('conflict') && !$cell.children().hasClass('occupied')) {
                cs.mediator.publish('scheduleCellMatched', {
                        $el: $cell,
                        event: this.scheduledEvent, 
                        id: eventId
                });

               this.updateSchedule($cell, 'add');

            } else if ($cell.children().hasClass('occupied')) {
                cs.mediator.publish('removedFromSchedule', {
                    eventId: eventId, 
                    $cell: $cell
                });

                this.updateSchedule($cell, 'remove');
            }

        },

        updateSchedule: function ($cell, mode) {
            var eventId = this.scheduledEvent.get('id'),
                day = $cell[0].dataset.day,
                interval = $cell[0].dataset.interval,
                thisWeek = this.model.attributes,
                thisInterval = thisWeek[day] && thisWeek[day][interval],
                modes = {
                    'add': add,
                    'remove': remove
                };

            modes[mode]();

            function add () {
                if (thisInterval) {
                    thisWeek[day][interval].push(eventId);
                } else if (thisWeek[day]){
                    thisWeek[day][interval] = [eventId];
                } else {
                    thisWeek[day] = {};
                    thisWeek[day][interval] = [eventId];
                }    
            }

            function remove () {
                var indexOfEvent = thisWeek[day][interval].indexOf(eventId);

                thisWeek[day][interval].splice(indexOfEvent, 1);
            }

            // save to server here!!!
        }
    });
})(App.Schedule);