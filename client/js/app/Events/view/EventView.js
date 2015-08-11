'use strict';
(function (This) {
    This.EventView = Backbone.View.extend({
        tagName: 'tr',
        tpl: templates.eventTpl,
		
		events: {
            'click .edit': 'edit',
            'click .dell': 'confirmDelete'
        },
		
        initialize: function () {
            this.model.on('change', function() {
                this.render();
            },this);
        },

        render: function () {
            var eventType = collections.eventTypes.get(this.model.get('type')),
                eventTypeName = eventType.get('name');
            this.$el.html(this.tpl({
                name: this.model.get('name'),
                type: eventTypeName
            }));

            return this;
        },

        edit: function () {
            cs.mediator.publish('EditEvent', this.model);
        },

        confirmDelete: function () {
            var message = 'Are you sure to delete "' + this.model.get('name') + '" event?';
            cs.mediator.publish('Confirm', message, this.delete.bind(this));
        },

        delete: function () {
            this.model.destroy();
            this.remove();
            cs.mediator.publish('Notice', 'Event was succesfully deleted'); //publish to Messenger's Controller
        }
    });
})(App.Events);