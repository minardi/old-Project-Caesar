(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'mainPage',
            'Resources': 'resources',
            'Events': 'events' 
        },
		
        mainPage: function () {
    
        },

        resources: function () {
            //creating Resources router
            ;
        },

        events: function () {
            //creating Events router
            ;
        }
    });
})(App);