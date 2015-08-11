(function (This) {
    This.HolidaysModel = Backbone.Model.extend({
        defaults: function () {
            return {
                'name': '',
                'locationCountry': '',
                'date': ''
            }
        },

        urlRoot: '/holidays',
    });
})(App.Holidays);