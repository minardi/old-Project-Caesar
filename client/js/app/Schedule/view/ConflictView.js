(function (This) {
	This.ConflictView = Backbone.View.extend({
		className: 'conflictCell',
		$frag: null,

		initialize: function (string, array) {
			this.$frag = $(document.createDocumentFragment());
			this.$frag.append('conflicts:<br>');

			this.arrayOfResources = array;
			this.stringOfResources = string;
			this.findConflicts();
		},

		findConflicts: function () {
			this.conflicts = [];
			this.isConflict = true;

			this.stringOfResources = this.stringOfResources.split(',');
			this.stringOfResources = this.stringOfResources.map(function (el) {
				return +el;
			});

			this.conflicts = _.intersection(this.stringOfResources, this.arrayOfResources);
			if (_.isEmpty(this.conflicts)) {
				this.isConflict = false;
			}

		},

		render: function () {
			// var res;
			// _.each(this.conflicts, function (_id) {
			// 	res = collections.resouresCollection.findWhere({id: +_id});
			// 	if (res) {
			// 		this.$frag.append(res.get('type') + ':');

			// 		this.$frag.append(res.get('name') + '<br>');
			// 	}
			// }, this);

			// this.$el.html(this.$frag);
			return this;
		}
	})
})(App.Schedule);