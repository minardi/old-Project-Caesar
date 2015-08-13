(function (This)  {
    This.Router = Backbone.Router.extend({

        routes: {
            '': 'events',
            'Resources*path': 'resources',
            'Events*path': 'events',
            'About*path': 'about',
            'Schedule*path': 'calendar',
            'Settings*path': 'settings',
            'Accounts*path': 'account',
            'Holidays*path': 'holidays',
            '*action': 'errorPage'
        },

        initialize: function () {
            cs.mediator.subscribe('MenuClicked', this.navigateMenuItem, null, this); //published from MenuView
            this.user = User.get();
        },
		
        mainPage: function () {
             cs.subRouters['Events'] || (cs.subRouters['Events'] = new App.Events.Router());
        },

        resources: function () {
           cs.subRouters['Resources'] || (cs.subRouters['Resources'] = new App.Resources.Router());
        },

        events: function () {
            cs.subRouters['Events'] || (cs.subRouters['Events'] = new App.Events.Router());
        },

        about: function () {
            cs.subRouters['About'] || (cs.subRouters['About'] = new App.About.Router());
        },

        calendar: function () {
            cs.subRouters['Schedule'] || (cs.subRouters['Schedule'] = new App.Schedule.Router());
        },

        settings: function () {
           	if(this.user.role === "Admin") {
                cs.subRouters['Settings'] || (cs.subRouters['Settings'] = new App.Settings.Router());
			} else {
				var errorPage = errorPage || new App.ErrorPage.Controller();
			}
        },

        account: function () {
            if(this.user.role === "Admin") {
                cs.subRouters['Accounts'] || (cs.subRouters['Accounts'] = new App.Accounts.Router());
			} else {
				var errorPage = errorPage || new App.ErrorPage.Controller();
			}
		},

        holidays: function () {
				cs.subRouters['Holidays'] || (cs.subRouters['Holidays'] = new App.Holidays.Router());
        },
        
        navigateMenuItem: function (pathname) {
            this.navigate(pathname, {trigger: true});
        },

        errorPage: function () {
            var errorPage = errorPage || new App.ErrorPage.Controller();
        }
    });
})(App);