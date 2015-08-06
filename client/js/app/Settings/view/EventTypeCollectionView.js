'use strict';
(function (This) {
    This.EventTypeCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-md-6',
        tpl: eventTypeTpl,

        events: {
            'keypress .new-type': 'createNewType'
        },

        initialize: function () {
            this.collection = collections.eventTypes;
            this.listenTo(this.collection, 'add', this.renderOne);
        },
        
        render: function () {
            this.$el.html(this.tpl);
            this.collection.each(function (model) {
                this.renderOne(model);
            }, this);

            return this;
        },

        renderOne: function (model) {
            var eventTypeView = new App.Settings.ItemView({model: model});
            this.$('.event-type').append(eventTypeView.render().$el);

            return this;
        },

        createNewType: function (e) {
            var ENTER = 13;
            if(e.which !== ENTER || !this.$('.new-type').val().trim()){
                return;
            }

            this.collection.create({name: this.$('.new-type').val()});
            this.$('.new-type').val('');
        }
        
    });
})(App.Settings);