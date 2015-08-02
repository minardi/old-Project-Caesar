'use strict';
(function (This) {
    This.ScheduleView = Backbone.View.extend({
        id: 'schedule',
        tpl: _.template(weeksTpl),
		displayedWeeks: 1,
		events: {
            'click a': 'setScheduledEvent'
        },

        initialize: function (options) {
            this.scheduledEvent = options.event;

            this.$el.append(this.tpl({events: cs.events.models}));
        },

        render: function () {
            _.each(this.collection.models, function (week) {
                var days = week.attributes[this.displayedWeeks];

                days && this.renderOne(days, this.displayedWeeks);
            }, this);

            return this;
        },

        renderOne: function (days, weekNumber) {
            var weekToRender = new This.Week(days);

            this.weekView = new This.WeekView({
                model: weekToRender, 
                weekNumber: weekNumber, 
                event: this.scheduledEvent
            });

            this.$el.append(this.weekView.render().el);
        },
        setScheduledEvent: function (e) {
            var eventId = e.currentTarget.dataset.id;

            this.scheduledEvent = cs.events.get(eventId);

            this.weekView.remove();

            this.render();
        }
    });
})(App.Schedule);