(function (This) {
	This.EventsView = Backbone.View.extend({
		tagName: 'ul',

		initialize: function () {
			this.collection = new App.Events.EventCollection();
			this.collection.listenTo(this.collection, 'add', this.showOne);
			this.collection.listenTo(this.collection, 'sync', this.giveCollection);
			this.collection.fetch();

			cs.mediator.subscribe('EventLoaded', this.renderOne, null, this);
		},

		showOne: function (event) {
			cs.mediator.publish('EventLoaded', event);
		},

		giveCollection: function (collection) {
			cs.mediator.publish('CollectionLoaded', collection);
		},

		renderOne: function (event) {
			var $li = $('<li></li>');
			$li.on('click', function () {
				cs.mediator.publish('EventSelected', event);
			});
			$li.html(event.get('name'));
			this.$el.append($li);
		},

		render: function () {
			return this;
		}
	})
})(App.Calendar);