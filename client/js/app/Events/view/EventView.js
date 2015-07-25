'use strict';
(function (This) {
    This.EventView = Backbone.View.extend({
        tagName: 'li',
        className: 'list-group-item',
        tpl: eventTpl,
		
		events: {
            'click .edit': 'edit',
            'click .dell': 'dell'
        },
		
        initialize: function () {
            this.model.on('change', function() {
                this.render();
            },this);
        },

        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));

            return this;
        },
		
		
        edit: function () {
            cs.mediator.publish('EditEvent', this.model);
        },

        dell: function () {
            cs.mediator.publish('DeleteEventById', this.model);
        }

    });
})(App.Events);