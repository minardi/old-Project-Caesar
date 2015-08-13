(function (This) {
    This.CollectionView = Backbone.View.extend({
        tagName: 'div',

        className: 'resource',

        template: templates.resourceCollectionTpl,

        events: {
            'click .create': 'create',
            'change .resourceSorting': 'sorting'
        },
    
        initialize: function () {
            this.collection = collections.resouresCollection;
            this.listenTo(this.collection, 'add', this.renderOne);
        },

        renderOne: function (model) {
            var view = new App.Resources.ResourcesModelHomepageView({model: model});
            this.$('.resource-list').append(view.render().el);
        },
    
        render: function () {
            this.$el.html(this.template);
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
            var model = this.collection.get(id);
            if (model) {
                callback(model);
            } else {
                cs.mediator.publish('Show404');
            }
        },
        
        sorting: function () {
            var sortingType = $('.resourceSorting').val();
            
            if (sortingType === '0') {
                this.collection.comparator = function(resource) {
                    return resource.get('type');
                };
                this.collection.sort();
                this.render();
            } else {
                this.collection.comparator = function(resource) {
                    return resource.get('name');
                };
                this.collection.sort();
                this.render();
            }
        }
    });
})(App.Resources);
