'use strict';

(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
//            '/Schedule': 'showSchedule',
        },

        initialize: function () {
            this.controller = new App.Schedule.scheduleController();

            cs.mediator.subscribe('scheduleCalled', this.navigateSchedule, null, this);

            //Backbone.history.loadUrl(Backbone.history.fragment);
        },

        navigateSchedule: function () {
            this.navigate('Schedule');
        },

        showSchedule: function () {
            cs.mediator.publish('scheduleCalled');
        },
    });
})(App.Schedule);




