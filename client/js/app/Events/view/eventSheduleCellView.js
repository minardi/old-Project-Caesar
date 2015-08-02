(function (This) {
    This.ScheduleCellView = Backbone.View.extend({
        tpl: _.template(scheduleCellTpl),
		tplConflict: _.template(scheduleConflictTpl),
		events: {
        },
		
        initialize: function (options) {
            this.scheduledEvent = options.scheduledEvent;

            this.isSameEvent =  this.model === this.scheduledEvent;

            this.conflicts = this.getConflicts();

            cs.mediator.subscribe('removedFromSchedule', this.removeFromSchedule, null, this);  
        },

        render: function () {
            if (!this.conflicts.length && !this.isSameEvent) {
                this.el = '';
            } else if (this.conflicts.length) {
                this.$el.addClass('conflict');               

                this.$el.html(this.tplConflict({
                    event: this.model.toJSON(),
                    conflicts: this.conflicts
                }));
            } else {
                this.$el.addClass('occupied');

                this.$el.html(this.tpl({
                    event: this.model.toJSON(),
                    conflicts: this.conflicts
                }));                
            }

            return this;
        },

        getConflicts: function () {
            var eventResources = this.model.get('resources'),
                scheduledResources = this.scheduledEvent.get('resources'),
                conflicts = [];

            _.each(eventResources, function (resourceId) {
                if (scheduledResources.indexOf(resourceId) !== -1 && !this.isSameEvent) {
                    conflicts.push(resourceId);
                }
            }, this);

            return conflicts;
        },

        removeFromSchedule: function (options) {
            var eventId = options.eventId,
                $cell = options.$cell,
                isSameEvent = eventId === this.model.get('id'),
                isSameCell = this.$el.parent()[0] === $cell[0];

            if (isSameEvent && isSameCell) {
                this.remove();
            }
        }
    });
})(App.Events);