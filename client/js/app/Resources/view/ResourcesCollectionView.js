(function (This) {
    This.CollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'resource',
        template: templates.resourceCollectionTpl,
        itemViews: [],

        events: {
            'click .create': 'create',
            'change .resourceSorting': 'sorting',
            'click .pageEl': 'changePage'
        },
    
        initialize: function () {
            this.collection = collections.resouresCollection;
            this.pageSize = 15;
            this.pageIndex = 0;
            this.listenTo(this.collection, 'add', this.render);
            this.listenTo(this.collection, 'destroy', this.render);
        },
    
        render: function () {
            this.pageCount = Math.ceil(this.collection.length / this.pageSize);
            this.$el.empty();
            this.$el.html(this.template({
                pageCount: this.pageCount
            }));

            this.renderGrid();

            return this;
        },

        renderGrid: function () {
            var currentModel,
                i;

            this.pageCount = Math.ceil(this.collection.length / this.pageSize);
            this.startPosition = this.pageIndex * this.pageSize;
            this.endPosition = this.startPosition + this.pageSize;

            _.each(this.itemViews, function (view) {
                view.remove();
            });

            if(!this.collection.models[this.startPosition]){
                this.pageIndex = this.pageIndex -1;
                this.startPosition = this.pageIndex * this.pageSize;
                this.endPosition = this.startPosition + this.pageSize;
            }

            for(i = this.startPosition; i < this.endPosition; i ++){
                currentModel = this.collection.models[i];
                if(currentModel) {
                    this.renderOne(currentModel);
                }else {
                    break;
                }
            }

            this.$(".pagination li").eq(this.pageIndex).addClass('active');
        },

        renderOne: function (model) {
            var view = new App.Resources.ResourcesModelHomepageView({model: model});
            this.itemViews.push(view);
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
                this.renderGrid();
            } else {
                this.collection.comparator = function(resource) {
                    return resource.get('name');
                };
                this.collection.sort();
                this.renderGrid();
            }
        },

        changePage: function (e) {
            this.pageIndex = e.currentTarget.value - 1;
            this.$(".pagination li").removeClass('active');
            this.renderGrid();
        }
    });
})(App.Resources);
