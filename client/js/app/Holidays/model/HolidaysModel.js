(function (This) {
    This.HolidaysModel = Backbone.Model.extend({
        defaults: function () {
            return {
                'name': '',
                'location': '',
                'date': ''
            }
        },

        urlRoot: '/holidays',
    });
})(App.Holidays);