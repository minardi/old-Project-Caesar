'use strict';
(function (This) {
    This.ResourceTypeCollectionView = This.CollectionView.extend({
        tagName: 'div',
        className: 'col-md-3',
        tpl: templates.resourceTypeTpl,

        events: {
            'keypress .new-type': 'createNew',
            'click .addResSettings': 'save'
        },

        initialize: function () {
            this.collection = collections.resourceTypes;
            this.listenTo(this.collection, 'add', this.renderOne);
			this.count = 0;
        },

        render: function () {
			this.count = 0;
            this.$el.html(this.tpl);
            this.collection.each(function (model) {
                this.renderOne(model);
            }, this);

            return this;
        },

        renderOne: function (model) {
            var resourceTypeView = new App.Settings.ItemView({model: model});
            this.$('.resource-type').append(resourceTypeView.render().el);
			this.count++;
			this.showScroll();

            return this;
        },

		showScroll: function () {
			var docHeight = $(document).height(),
			    boxHeight = docHeight - 226 + 'px',
			    divHeight = 224 + (45 * this.count),
                $resourceScroll = this.$('#resourceScroll');

			if (divHeight >= docHeight) {
			    $resourceScroll.addClass('showScroll');
				this.$('.showScroll').css('height', boxHeight)
			} else {
				$resourceScroll.removeClass('showScroll');
			}
		}
    });
})(App.Settings);