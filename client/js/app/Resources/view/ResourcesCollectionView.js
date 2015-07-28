(function (This) {
    This.CollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'resource',
        template: resourceCollectionTpl,

        events: {
            'click .create': 'create'
        },
    
        initialize: function () {
            this.collection = new This.ResourcesCollection();
            this.listenToOnce(this.collection, 'sync', this.renderOne);

            cs.mediator.subscribe('ResourceSaved', this.saveModel, {}, this); 

            this.collection.fetch();
        },

        saveModel: function (model) {
            this.collection.add(model);
            this.update(model);
        },

        update: function (model) {
            var view = new This.ResourcesModelHomepageView({model: model}).render();
            $('.resource-list').append(view.$el);
        },
    
        renderOne: function (model) {
            this.collection.each(function(model) {
                var view = new This.ResourcesModelHomepageView({model: model}).render();
                $('.resource-list').append(view.$el);
            });
        },
    
        render: function () {
            this.$el.html(this.template());
            return this;
        },

        create: function () {
            cs.mediator.publish('CreateResource');
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
})(App.Resources);
