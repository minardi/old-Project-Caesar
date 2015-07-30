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

            cs.mediator.subscribe('ResourceSaved', this.updateCollection, {}, this); //published from CreateEditView

            this.collection.fetch();
        },

        updateCollection: function (model) {
            var view = new This.ResourcesModelHomepageView({model: model}).render();
            this.collection.add(model);
            $('.resource-list').append(view.$el);
        },
    
        renderOne: function (model) {
            var container = document.createDocumentFragment(),
                view;

            this.collection.each(function(model) {
                view = new This.ResourcesModelHomepageView({model: model}).render();
                container.appendChild(view.el);
            });

            $('.resource-list').append(container);
        },
    
        render: function () {
            this.$el.html(this.template());

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
