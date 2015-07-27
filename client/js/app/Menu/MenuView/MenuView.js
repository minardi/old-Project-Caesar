'use strict';
(function (This) {
    This.MenuView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-sm-10 col-sm-offset-1',
        tpl: menuTpl,

        events: {
            'click .resources': 'showResources',
            'click .events': 'showEvents',
            'click .schedule': 'showSchedule'
        },

        render: function () {
            this.$el.html(this.tpl);

            return this;
        },

        showResources: function () {
            cs.mediator.publish('MenuClicked', '/Resources');
            this.$el.find('.menu-item').removeClass('active');
            this.$el.find('.resources').addClass('active');
        },

        showEvents: function () {
            cs.mediator.publish('MenuClicked', '/Events');
            this.$el.find('.menu-item').removeClass('active');
            this.$el.find('.events').addClass('active');
        }
    });
})(App.Menu);