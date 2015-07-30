(function (This) {
	This.EventsView = Backbone.View.extend({
		tagName: 'ul',

		setCollection: function (_collection) {
			this.collection = _collection;
		},

		renderOne: function (event) {
			var $li = $('<li>' + event.get('name') + '</li>');
			return $li;
		},

		render: function () {
			console.log(this.collection);
			_.each(this.collection, function (event) {
				this.$el.append(this.renderOne(event))
			}, this);

			return this;
		}
	})
})(App.Schedule);