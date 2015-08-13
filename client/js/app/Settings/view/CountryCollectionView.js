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

            return this;
        },

        createNewCountry: function (e) {
            var ENTER = 13;
            if(e.which !== ENTER || !this.$('.new-country').val().trim()){
                return;
            }
            this.collection.create({name: this.$('.new-country').val()});
            this.$('.new-country').val('');
            cs.mediator.publish('CreateCountry', this);
        }
    });
})(App.Settings);