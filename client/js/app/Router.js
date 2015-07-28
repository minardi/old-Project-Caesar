(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'mainPage',
            'Resources*path': 'resources',
            'Events*path': 'events',
            'About*path': 'about'
        },

        initialize: function () {
            cs.mediator.subscribe('MenuClicked', this.navigateMenuItem, null, this)
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

        navigateMenuItem: function (pathname) {
            this.navigate(pathname, {trigger: true});
        }
    });
})(App);