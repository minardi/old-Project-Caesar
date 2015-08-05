(function (This)  {
    This.Router = Backbone.Router.extend({

        routes: {
            '': 'events',
            'Resources*path': 'resources',
            'Events*path': 'events',
            'About*path': 'about',
            'Schedule*path': 'calendar',
            'Settings*path': 'settings'
        },

        initialize: function () {
            //this.route(/error/, 'errorPage', this.errorPage);
            //this.route(/^((?!(Events|Resources|About|Schedule)).)*$/, 'errorPage');

            cs.mediator.subscribe('MenuClicked', this.navigateMenuItem, null, this); //published from MenuView
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
            cs.subRouters['Settings'] || (cs.subRouters['Settings'] = new App.Settings.Router());
        },
        
        navigateMenuItem: function (pathname) {
            this.navigate(pathname, {trigger: true});
        },

        errorPage: function () {
            var errorPage = errorPage || new App.ErrorPage.Controller();
        }
    });
})(App);