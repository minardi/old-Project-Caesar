'use strict';
(function (This) {
    This.CountryCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-md-3',
        template: templates.countryTpl,

        events: {
            'keypress .new-country': 'createNewCountry',
            'click .addCountySettings': 'saveCity'
        },

        initialize: function () {
            this.collection = collections.countriesCollection;
            this.listenTo(this.collection, 'add', this.renderOne);
			cs.mediator.subscribe('UpdateCountries', this.updateCollection, {}, this);
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
            var countryView = new App.Settings.ItemView({model: model});
            this.$('.countries').append(countryView.render().el);
            this.$('.destroy').addClass('country');
			this.count++;
			this.showScroll();
            
			return this;
        },

        showScroll: function () {
			var docHeight = $(document).height(),
			    boxHeight = docHeight - 274 + 'px',
			    divHeight = 224 + (45 * this.count);
			
			if(divHeight >= (docHeight - 50)) {
			    this.$('#countyScroll').addClass('showScroll');
				this.$('.showScroll').css('height', boxHeight)
			} else {
				this.$('#citiesScroll').removeClass('showScroll');
			}
		},
        createNewCountry: function (e) {
            var ENTER = 13,
                $inputCountry = this.$('.new-country');
            if(e.which !== ENTER || !$inputCountry.val().trim()){
                return;
            }
            this.collection.create({countryName: $inputCountry.val()});
            $inputCountry.val('');
            cs.mediator.publish('CreateCountry', this);
        },
		
		updateCollection: function (){
            this.render();  
        },
		
		saveCity: function () {
			var inputCity = this.$('.new-country');
			
			if(inputCity.val() != '') {
				this.collection.create({
					name: inputCity.val()
			    });
			}
			inputCity.val('');
		}
    });
})(App.Settings);