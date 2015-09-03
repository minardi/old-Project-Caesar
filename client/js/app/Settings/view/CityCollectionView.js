'use strict';
(function (This) {
    This.CityCollectionView = This.CollectionView.extend({
        tagName: 'div',
        className: 'col-md-3',
        template: templates.cityTpl,

        events: {
            'keypress .new-city': 'createNew',
            'click .addSettings': 'save'
        },

        initialize: function () {
            this.model = new This.City();
            Backbone.Validation.bind(this);
            this.collection = collections.citiesCollection;
            this.listenTo(this.collection, 'add', this.renderOne);
            this.listenTo(collections.countriesCollection, 'all', this.render);
			this.count = 0;
        },

        render: function () {
			this.count = 0;
            this.$el.html(this.template({
                locationCountry: collections.countriesCollection.toJSON()
            }));
            this.collection.each(function (model) {
                this.renderOne(model);
            }, this);

            return this;
        },

        renderOne: function (model) {
            var cityView = new App.Settings.ItemView({model: model});
            this.$('.cities').append(cityView.render().el);
			this.count++;
			this.showScroll();
            
			return this;
        },

        createNew: function (e) {
            var ENTER = 13,
                $inputCity = this.$('.new-city');

            if(e.which !== ENTER || !$inputCity.val().trim()){
                return;
            }

            this.collection.create({
                name: $inputCity.val(),
                location: this.$('#selectCountry').val()
            });
            $inputCity.val('');
        },

        showScroll: function () {
            var docHeight = $(document).height(),
                boxHeight = docHeight - 250 + 'px',
                currentBoxHeight = 224 + (45 * this.count);

            if(currentBoxHeight >= (docHeight - 50)) {
                this.$('#citiesScroll').addClass('showScroll');
                this.$('.showScroll').css('height', boxHeight)
            } else {
                this.$('#citiesScroll').removeClass('showScroll');
            }
        },
		
		save: function () {
			var inputCity = this.$('.new-city');
			
			if(inputCity.val() != '') {
				this.collection.create({
					name: inputCity.val(),
					location: this.$('#selectCountry').val()
                });
			}
			
			inputCity.val('');
		}
    });
})(App.Settings);