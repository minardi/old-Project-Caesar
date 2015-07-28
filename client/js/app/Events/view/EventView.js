'use strict';
(function (This) {
    This.EventView = Backbone.View.extend({
        tagName: 'tr',
        tpl: eventTpl,
		
		events: {
            'click .edit': 'edit',
            'click .dell': 'delete'
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

        delete: function () {
            this.model.destroy();
            this.remove();
        }
    });
})(App.Events);