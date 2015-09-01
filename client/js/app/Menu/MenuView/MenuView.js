'use strict';
(function (This) {
    This.MenuView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-sm-10 col-sm-offset-1',
        tpl: templates.menuTpl,
		flag: '/preload',

        events: {
            'click .resources': 'showResources',
            'click .events': 'showEvents',
            'click .schedule': 'showSchedule',
            'click .settings': 'showSettings',
            'click .contributors': 'showContributors',
            'click .holidays': 'showHolidays',
            'click .accounts': 'showAccounts',
			'click .myChek': 'changeRole'
        },

        render: function () {
			var user = User.get();
			
            this.$el.html(this.tpl({name : user}));

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
            cs.mediator.publish('MenuClicked', '/Settings'); //publish to global router
            this.$('.menu-item').removeClass('active');
            this.$('.settings').addClass('active');
        },       

        showContributors: function () {
            cs.mediator.publish('MenuClicked', '/About'); //publish to global router
            this.$('.menu-item').removeClass('active');
            this.$('.contributors').addClass('active');
            //this.$('.about').addClass('active');
        },

        showAccounts: function () {
            cs.mediator.publish('MenuClicked', '/Accounts'); //publish to global router
            this.$('.menu-item').removeClass('active');
            this.$('.accounts').addClass('active');
        },

        showHolidays: function () {
            cs.mediator.publish('MenuClicked', '/Holidays'); //publish to global router
            this.$('.menu-item').removeClass('active');
            this.$('.holidays').addClass('active');
        },
		
		changeRole: function () {
			var load = new DataLoaderChange();
			
			if(this.flag === '/load') {
				this.flag = '/preload';
				this.$('.changeRole').removeClass('active');
				this.$('#role').text('Coordinator');
			} else {
				this.flag = '/load';
                this.$('.changeRole').addClass('active');
				this.$('#role').text('Admin');
			}
			
		    load.loadCollections(main, this.flag);
		}
    }); 
})(App.Menu);