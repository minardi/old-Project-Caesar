(function (This) {
	This.ScheduleConfirmView = App.Messenger.ConfirmView.extend({

        set: function (message, callbackYes, yesOptions, callback) {
        	this.message = message;

        	this.callbackYes = callbackYes;
        	this.yesOptions = yesOptions;
            this.callback = callback;
        },

        delete: function () {

            this.callbackYes(this.yesOptions);
            this.remove();
            this.callback();
        },

        close: function () {
            
            this.remove();
            this.callback();
        }
	})
})(App.Schedule);