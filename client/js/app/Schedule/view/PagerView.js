(function (This) {
	This.PagerView = Backbone.View.extend({
		template: templates.schedulePagerTpl,
		nextNumber: 0,

		events: {
			'click .next': 'showNext',
			'click .previous': 'showPrevious'
		},

		showNext: function () {
			cs.mediator.publish('NextWeekSelected', ++this.nextNumber);
		},

		showPrevious: function () {
			cs.mediator.publish('PreviousWeekSelected', --this.nextNumber);
		},

		render: function () {
			this.$el.html(this.template());
			return this;
		}
	})
})(App.Schedule);