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
        },

        render: function () {
            this.$el.html(this.template);
            this.collection.each(function (model) {
                this.renderOne(model);
            }, this);

            return this;
        },

        renderOne: function (model) {
            var cityView = new App.Settings.ItemView({model: model});
            this.$('.cities').append(cityView.render().el);

            return this;
        },

        createNewCity: function (e) {
            var ENTER = 13;
            if(e.which !== ENTER || !this.$('.new-city').val().trim()){
                return;
            }

            this.collection.create({
                name: this.$('.new-city').val(),
                location: 3

            });
            this.$('.new-city').val('');
        }
    });
})(App.Settings);