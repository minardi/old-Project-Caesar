(function (This) {
    This.CollectionView = Backbone.View.extend({
        tagName: 'table',

        events: {
            'click .create': 'create'
        },
    
        initialize: function () {
            this.collection = new This.ResourcesCollection();
            this.listenToOnce(this.collection, 'sync', this.renderOne);

            cs.mediator.subscribe('ResourceSaved', this.saveModel, {}, this); //added by Ivan


            this.collection.fetch();
        },

        saveModel: function (model) {
            this.collection.add(model);
            this.update();
        },

        update: function () {
            this.render();
        },
    
        renderOne: function (model) {
            var self = this;
            this.collection.each(function(model) {
                var view = new This.ResourcesModelHomepageView({model: model}).render();
                self.$el.append(view.$el);
            });
        },
    
        render: function () {
            return this;
        },

        create: function () {
            cs.mediator.publish('CreateResource');
        },
    });
})(App.Resources);
