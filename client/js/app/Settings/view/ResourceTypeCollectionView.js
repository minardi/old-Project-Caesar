'use strict';
(function (This) {
    This.ResourceTypeCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-md-3',
        tpl: templates.resourceTypeTpl,

        events: {
            'keypress .new-type': 'createNewType',
            'click .addResSettings': 'saveCity'
        },

        initialize: function () {
            this.collection = collections.resourceTypes;
            this.listenTo(this.collection, 'add', this.renderOne);
			cs.mediator.subscribe('UpdateRecourse', this.updateCollection, {}, this);
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
			     divHeight = 224 + (45 * this.count);
			
			if(divHeight >= docHeight) {
			    this.$('#resourceScroll').addClass('showScroll');
				this.$('.showScroll').css('height', boxHeight)
			} else {
				this.$('#resourceScroll').removeClass('showScroll');
			}
		},
		
		updateCollection: function (){
            this.render();  
        },

        createNewType: function (e) {
            var ENTER = 13,
                $typeValue = this.$('.new-type');

            if(e.which !== ENTER || !$typeValue.val().trim()){
                return;
            }

            this.collection.create({name: $typeValue.val()});
            $typeValue.val('');
        },
		
		saveCity: function () {
			var inputCity = this.$('.new-type');
			
			if(inputCity.val() !== '') {
				this.collection.create({name: inputCity.val()});
			}
			
			inputCity.val('');
		}
    });
})(App.Settings);