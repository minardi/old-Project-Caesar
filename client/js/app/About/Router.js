'use strict';

(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'About': 'showAbout'            
        },

        initialize: function () {
            var controller = new This.Controller();

            //URL navigation
            cs.mediator.subscribe('ShowAbout', this.navigateAbout, null, this);
            
            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        navigateAbout: function () {
            this.navigate('About');
        },

        showAbout: function () {
            cs.mediator.publish('ShowAbout');
        }
    });
})(App.About);