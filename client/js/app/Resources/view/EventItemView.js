'use strict';
(function (This) {
    This.EventItemView = Backbone.View.extend({
        tagName: 'tr',
        className: '',
        tpl: templates.eventForEditTpl,

        events: {
            'click .edit': 'edit',
            'dblclick': 'edit'
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
            cs.mediator.publish('EditEventClicked', this.model); //publish to resource Controller
        }
    });
})(App.Resources);
