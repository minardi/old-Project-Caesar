(function (This) {
    This.HolidaysCollection = Backbone.Collection.extend({
        model: This.HolidaysModel,
        url: '/holidays',
    });
})(App.Holidays);