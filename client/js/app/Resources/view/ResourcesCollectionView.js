(function (This) {
    This.CollectionView = Backbone.View.extend({
        tagName: 'div',

        className: 'resource',

        template: templates.resourceCollectionTpl,

        events: {
            'click .create': 'create'
        },
    
        initialize: function () {
            cs.mediator.subscribe('ResourceSaved', this.updateCollection, {}, this); //published from CreateEditView
        },

        updateCollection: function (model) {
            var view = new This.ResourcesModelHomepageView({model: model}).render();
            this.collection.add(model);
            $('.resource-list').append(view.$el);
        },
        
        renderOne: function (model) {
            var view = new App.Resources.ResourcesModelHomepageView({model: model});
            this.$('.resource-list').append(view.render().el);
        },
    
        render: function () {
            this.$el.append(this.template);
            this.collection.each(function (resource) {
                this.renderOne(resource)
            }, this);

            return this;
        },

        create: function () {
            cs.mediator.publish('CreateResource'); //publish to Controller
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
