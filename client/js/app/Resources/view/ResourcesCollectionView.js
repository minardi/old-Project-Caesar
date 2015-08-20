(function (This) {
    This.CollectionView = Backbone.View.extend({
        tagName: 'div',

        className: 'resource',

        template: templates.resourceCollectionTpl,

        events: {
            'click .create': 'create',
            'change .resourceSorting': 'sorting',
            'click .pageEl': 'changePage'
        },
    
        initialize: function () {
            this.pageSize = 5;
            this.pageIndex = 0;
            this.collection = collections.resouresCollection;
            this.listenTo(this.collection, 'add', this.render);
            this.listenTo(this.collection, 'destroy', this.render);
        },
    
        render: function () {
            var pageCount = Math.ceil(this.collection.length / this.pageSize),
                startPosition = this.pageIndex * this.pageSize,
                endPosition = startPosition + this.pageSize,
                currentModel,
                i;
            this.$el.html(this.template({
                pageCount: pageCount
            }));

            for(i = startPosition; i < endPosition; i ++){
                currentModel = this.collection.models[i];
                if(currentModel) {
                    this.renderOne(currentModel);
                }
            }

            this.$(".pagination li").eq(this.pageIndex).addClass('active');

            return this;
        },

        renderOne: function (model) {
            var view = new App.Resources.ResourcesModelHomepageView({model: model});
            this.$('.resource-list').append(view.render().el);
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
        },

        changePage: function (e) {
            this.pageIndex = e.currentTarget.value - 1;
            this.render();
        }
    });
})(App.Resources);
