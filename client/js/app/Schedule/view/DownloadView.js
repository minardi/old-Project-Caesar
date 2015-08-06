(function (This) {
	This.DownloadView = Backbone.View.extend ({
		tagName: 'button',
		className: 'btn-info',

		events: {
			'click': 'download'
		},

		render: function () {
			this.$el.html('Download');
			return this;
		},

		download: function () {
			console.log('I work');
		}
	})
})(App.Schedule);