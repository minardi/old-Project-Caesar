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
            this.$('.destroy').addClass('country');
            return this;
        },

        createNewCountry: function (e) {
            var ENTER = 13,
                $inputCountry = this.$('.new-country');
            if(e.which !== ENTER || !$inputCountry.val().trim()){
                return;
            }
            this.collection.create({countryName: $inputCountry.val()});
            $inputCountry.val('');
        }
    });
})(App.Settings);