(function (This) {
	This.PagerView = Backbone.View.extend({
		template: schedulePagerTpl,
		nextNumber: 0,

		events: {
			'click .next': 'showNext',
			'click .previous': 'showPrevious'
		},

		showNext: function () {
			cs.mediator.publish('DiffWeekSelected', ++this.nextNumber);
		},

		showPrevious: function () {
			cs.mediator.publish('DiffWeekSelected', --this.nextNumber);
		},

		render: function () {
			(this.$el).html(this.template());
			return this;
		}
	})
})(App.Schedule);