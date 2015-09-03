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

        createNew: function (e) {
            var ENTER = 13,
                $inputCity = this.$('.new-city');

            if(e.which !== ENTER || !$inputCity.val().trim()){
                return;
            }

            this.save();
        },
		
		save: function () {
            var attributes;

            this.$inputCity = this.$('.new-city');

            attributes = {
                    name: this.$inputCity.val().trim(),
                    location: this.$('#selectCountry').val()
                };

            if (!this.preValidate(attributes)) {
                this.collection.create(attributes);
                this.$inputCity.val('');
            }
		},

        preValidate: function (attributes) {
            var attrName,
                validationResult;

            validationResult = this.validateName() || this.model.preValidate(attributes);

            if (validationResult) {
                for (attrName in validationResult) {
                    cs.mediator.publish(   //publish to Messenger's Controller
                        'Hint',
                        validationResult[attrName],
                        this.$('[name=' + attrName + ']')
                    );
                }
            }

            return validationResult;
        },

        isNameTaken: function (value) {
            var cities = collections.citiesCollection.toJSON(),
                citiesNames = [],
                result;

            cities.forEach(function (element) {
                citiesNames.push(element['name']);
            });

            result = _.contains(citiesNames, value);
            return result;
        },

        validateName: function () {
            var errorMsg = {name: 'This name is already taken'},
                result = this.isNameTaken(this.$inputCity.val())? errorMsg: undefined;

            return result;
        }
    });
})(App.Settings);