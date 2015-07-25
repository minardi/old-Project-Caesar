(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'mainPage',
            'Resources*path': 'resources',
            'Events*path': 'events' 
        },
		
        mainPage: function () {

        },

        resources: function () {
           cs.subRouters['Resources'] || (cs.subRouters['Resources'] = new App.Resources.Router());
        },

        events: function () {
            cs.subRouters['Events'] || (cs.subRouters['Events'] = new App.Events.Router());
        }   
    });
})(App);