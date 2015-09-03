'use strict';
(function (This) {
    This.CountryCollectionView = This.CollectionView.extend({
        tagName: 'div',
        className: 'col-md-3',
        template: templates.countryTpl,

        events: {
            'keypress .new-country': 'createNew',
            'click .addCountySettings': 'save'
        },

        initialize: function () {
            this.model = new This.City();
            Backbone.Validation.bind(this);
            this.collection = collections.countriesCollection;
            this.listenTo(this.collection, 'add', this.renderOne);
        },

        render: function () {
			this.count = 0;
            this.$el.html(this.template);
            this.collection.each(function (model) {
                this.renderOne(model);
            }, this);

            return this;
        },

        renderOne: function (model) {
            var countryView = new App.Settings.CountryItemView({model: model});
            this.$('.countries').append(countryView.render().el);
            this.$('.destroy').addClass('country');
			this.count++;
			this.showScroll();
            
			return this;
        },

        showScroll: function () {
			var docHeight = $(document).height(),
			    boxHeight = docHeight - 226 + 'px',
			    divHeight = 224 + (45 * this.count);
			
			if(divHeight >= (docHeight - 50)) {
			    this.$('#countyScroll').addClass('showScroll');
				this.$('.showScroll').css('height', boxHeight)
			} else {
				this.$('#countyScroll').removeClass('showScroll');
			}
		},

        createNew: function (e) {
            var ENTER = 13,
                $inputCountry = this.$('.new-country');

            if(e.which !== ENTER || !$inputCountry.val().trim()){
                return;
            }
            this.collection.create({countryName: $inputCountry.val()});
            $inputCountry.val('');
            
        },
		
		save: function () {
			var $input = this.$('.new-country');
			
			if($input.val() !== '') {
				this.collection.create({
					countryName: $input.val()
			    });
			}

            $input.val('');
		}
    });
})(App.Settings);