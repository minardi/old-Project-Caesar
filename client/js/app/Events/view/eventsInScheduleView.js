'use strict';
(function (This) {
    This.EventView = Backbone.View.extend({
        tagName: 'span',
        tpl: eventInScheduleTpl,
        
        events: {
            'click': 'choseEvent',

        },

        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));

            return this;
        },

        choseEvent: function () {
            cs.mediator.publish('eventChosen', this.model.get('id'));
        }
    });
})(App.Events);