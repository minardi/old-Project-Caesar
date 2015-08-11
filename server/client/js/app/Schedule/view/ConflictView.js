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

			_.each(this.arrayOfResources, function (id) {	
				if (this.stringOfResources.indexOf(id) >= 0) {
					this.conflicts.push(id);
				}
			}, this);

			(_.isEmpty(this.conflicts)) && (this.isConflict = false);

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
		},

		changeSize: function ($parent) {
			var parentHeight = parseInt($parent.css('height')),
				childrenHeight = parseInt($parent.children().height),
				height;
			
			height = (parentHeight - childrenHeight) * 100 / parentHeight;
			this.$el.css('height', height + '%');
		}
	})
})(App.Schedule);