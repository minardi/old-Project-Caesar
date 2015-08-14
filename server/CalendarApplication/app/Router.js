(function (This) {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'mainView'
        },

        initialize: function () {
            this.controller = new App.Controller();
        },
        
        mainView: function () {
            this.navigate('');
        }
    });
})(App);