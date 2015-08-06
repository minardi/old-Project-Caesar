'use strict';
(function (This) {
    This.MenuView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-sm-10 col-sm-offset-1',
        tpl: templates.menuTpl,

        events: {
            'click .resources': 'showResources',
            'click .events': 'showEvents',
            'click .schedule': 'showSchedule',
            'click .settings': 'showSettings',
            'click .reference': 'showReference',
            'click .contributors': 'showContributors',
            //'click .about': 'showAbout',
            'click .holidays': 'showHolidays',
            'click .createAccount': 'createAccount'
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

         showSettings: function () {
            //cs.mediator.publish('MenuClicked', '/Settings'); //publish to global router
            this.$('.menu-item').removeClass('active');
            this.$('.settings').addClass('active');
        },
        
        showReference: function () {
            //cs.mediator.publish('MenuClicked', '/Reference'); //publish to global router
            this.$('.menu-item').removeClass('active');
            this.$('.reference').addClass('active');
        },       

        showContributors: function () {
            cs.mediator.publish('MenuClicked', '/About'); //publish to global router
            this.$('.menu-item').removeClass('active');
            this.$('.contributors').addClass('active');
            //this.$('.about').addClass('active');
        },

        createAccount: function () {
            cs.mediator.publish('MenuClicked', '/Accounts'); //publish to global router
            this.$('.menu-item').removeClass('active');
            this.$('.createAccount').addClass('active');
        },

        showHolidays: function () {
            cs.mediator.publish('MenuClicked', '/Holidays'); //publish to global router
            this.$('.menu-item').removeClass('active');
            this.$('.holidays').addClass('active');
        }
    }); 
})(App.Menu);