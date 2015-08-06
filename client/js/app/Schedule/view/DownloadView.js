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
            $('<form action="/download" method="get"></form>')
            .appendTo('body').submit().remove();
		}
	})
})(App.Schedule);