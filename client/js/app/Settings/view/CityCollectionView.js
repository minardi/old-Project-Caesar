'use strict';
(function (This) {
    This.CityCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-md-3',
        template: templates.cityTpl,

        events: {
            'keypress .new-city': 'createNewCity'
        },

        initialize: function () {
            this.collection = collections.citiesCollection;
            this.listenTo(this.collection, 'add', this.renderOne);
            cs.mediator.subscribe('CreateCountry', this.updateCollection, {}, this);
            cs.mediator.subscribe('DeleteCountry', this.deleteCollection, {}, this);
            cs.mediator.subscribe('UpdateCountry', this.updateCollection, {}, this);
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
		
		showScroll: function () {
			if(this.count >= 7) {
				this.$('#citiesScroll').addClass('showScroll');
			} else {
				this.$('#citiesScroll').removeClass('showScroll');
			}
		},

        selectCountry: function () {          
            var selectedCountry =  this.$('#selectCountry option:selected').text(),
                valueSelected;
            collections.countriesCollection.toJSON().forEach(function (item) {
                if(item['countryName'] === selectedCountry){
                    valueSelected = item['id'];
                }
            });
            return valueSelected;
        },

        updateCollection: function () {
            this.render();  
        },

        deleteCollection: function (deletedId) {        
            _.each(_.clone(collections.citiesCollection.toJSON()), function(item) {
                if(item['location'] === deletedId){
                var modelCity = collections.citiesCollection.get(item);
                    modelCity.destroy();
                }
            });
           this.render();
        }, 

        createNewCity: function (e) {
            var ENTER = 13,
                $inputCity = this.$('.new-city');
            if(e.which !== ENTER || !$inputCity.val().trim()){
                return;
            }
            this.collection.create({
                name: $inputCity.val(),
                location: this.selectCountry(),
                
            });
            $inputCity.val('');
        }
    });
})(App.Settings);