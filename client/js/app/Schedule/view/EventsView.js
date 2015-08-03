(function (This) {
	This.EventsView = Backbone.View.extend({
		tagName: 'ul',
		className: 'list-group',
		$fragment: null,

		events: {
			'click': 'selectItem'
		},

		initialize: function () {
			this.$el.parent().addClass('list-group');
		},

		selectItem: function (event) {
			$(event.target).parent().children().removeClass('active');
			$(event.target).addClass('active');
		},

		render: function () {
			this.$fragment = $(document.createDocumentFragment());
			collections.eventsCollection.each(this.renderOne.bind(this));
			this.$el.html(this.$fragment);
			return this;
		},

		renderOne: function (event) {
			var eventView = new This.OneEventView({model:event});
			this.$fragment.append(eventView.render().el);
		},


	})
})(App.Schedule);