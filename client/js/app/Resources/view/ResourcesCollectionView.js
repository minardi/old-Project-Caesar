(function (This) {
    This.CollectionView = Backbone.View.extend({
        tagName: 'table',
    
        initialize: function () {
            this.collection = new ResourcesCollection();
            this.listenToOnce(this.collection, 'sync', this.renderOne);
            this.collection.fetch();
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
        }
    });
})(App.Resources);
