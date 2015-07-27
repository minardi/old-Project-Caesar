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
            var self = this;
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
        }
    });
})(App.Resources);
