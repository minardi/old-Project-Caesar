'use strict';
(function (This) {
    This.MenuView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-sm-10 col-sm-offset-1',
        tpl: menuTpl,

        events: {
            'click .resources': 'showResources',
            'click .events': 'showEvents',
            'click .schedule': 'showSchedule',
            'click .about': 'showAbout'
        },

        render: function () {
            this.$el.html(this.tpl);

            return this;
        },

        showResources: function () {
            cs.mediator.publish('MenuClicked', '/Resources'); //publish to global router
            this.$('.menu-item').removeClass('active');
            this.$('.resources').addClass('active');
        },

        showEvents: function () {
            cs.mediator.publish('MenuClicked', '/Events'); //publish to global router
            this.$('.menu-item').removeClass('active');
            this.$('.events').addClass('active');
        },

        showSchedule: function () {
            cs.mediator.publish('MenuClicked', '/Schedule'); //publish to global router
            this.$('.menu-item').removeClass('active');
            this.$('.schedule').addClass('active');
        },

        showAbout: function () {
            cs.mediator.publish('MenuClicked', '/About'); //publish to global router
            this.$('.menu-item').removeClass('active');
            this.$('.about').addClass('active');
        }
    });
})(App.Menu);