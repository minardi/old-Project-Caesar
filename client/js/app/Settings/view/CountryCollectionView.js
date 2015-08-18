'use strict';
(function (This) {
    This.CountryCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-md-3',
        template: templates.countryTpl,

        events: {
            'keypress .new-country': 'createNewCountry'
        },

        initialize: function () {
            this.collection = collections.countriesCollection;
            this.listenTo(this.collection, 'add', this.renderOne);
        },

        render: function () {
            this.$el.html(this.template);
            this.collection.each(function (model) {
                this.renderOne(model);
            }, this);

            return this;
        },

        renderOne: function (model) {
            var countryView = new App.Settings.ItemView({model: model});
            this.$('.countries').append(countryView.render().el);
            $('.destroy').addClass('country');
            return this;
        },

        createNewCountry: function (e) {
            var ENTER = 13,
                $inputCountry = $('.new-country');
            if(e.which !== ENTER || !$inputCountry.val().trim()){
                return;
            }
            this.collection.create({countryName: $inputCountry.val()});
            $inputCountry.val('');
            cs.mediator.publish('CreateCountry', this);
            if (App.Holidays.CollectionView) {
                cs.mediator.publish('CountryCreated', 'all'); //publish to HolidaysCollectionView
            }
        }
    });
})(App.Settings);