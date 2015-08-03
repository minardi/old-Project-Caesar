(function (This) {
	This.ScheduleCellView = Backbone.View.extend({
		className: 'calendarCellDiv',
		model: App.Events.Event,
		template: sheduleCellTpl,
		weekItem: null,
		collection: This.Schedule,

		events: {
			'click button': 'close'
		},

		render: function () {
			this.$el.html(this.template({'value': this.model.get('name')}));
			return this;
		},

		close: function () {
			this.remove();
		}
	})
})(App.Schedule);