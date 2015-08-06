(function (This) {
    This.CollectionView = Backbone.View.extend({
        tagName: 'div',

        className: 'holiday',

        template: templates.holidaysCollectionTpl,

        events: {
            'click .create': 'create'
        },
    
        initialize: function () {
            cs.mediator.subscribe('HolidaySaved', this.updateCollection, {}, this); //published from CreateEditView
        },

        updateCollection: function (model) {
            var view = new This.HolidaysModelHomepageView({model: model}).render();
            this.collection.add(model);
            $('.holidays-list').append(view.$el); 
        },
        
        renderOne: function (model) {
            var view = new This.HolidaysModelHomepageView({model: model});
            this.$('.holidays-list').append(view.render().el); 
        },
    
        render: function () {
            this.$el.append(this.template);
            this.collection.each(function (holiday) {
                this.renderOne(holiday)
            }, this);

            return this;
        },

        create: function () {
            cs.mediator.publish('CreateHoliday'); //publish to Controller
        },

        show: function () {
            this.$el.removeClass('hidden');
        },
        
        getModelById: function (id, callback) {
            if (this.collection.get(id)) {
                callback(this.collection.get(id));
            } else {
                this.collection.once('sync', function () {
                    if (this.collection.get(id)) {
                        callback(this.collection.get(id));
                    } else {
                        vm.mediator.publish('Show404');
                    }
                }, this);
            }
        }
    });
})(App.Holidays);
