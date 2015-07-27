(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'mainPage',
            'Resources*path': 'resources',
            'Events*path': 'events' 
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

        navigateMenuItem: function (pathname) {
            this.navigate(pathname, {trigger: true});
        }
    });
})(App);