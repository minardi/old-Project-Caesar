(function (This) {
    This.CollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'resource',
        template: templates.resourceCollectionTpl,
        itemViews: [],

        events: {
            'click .create': 'create',
            'change .resourceSorting': 'sorting',
            'click .pageEl': 'changePage',
            'keyup .searchField': 'startSearch'
        },
    
        initialize: function () {
            this.collection = collections.resouresCollection;
            this.pageSize = 5;
            this.pageIndex = 0;
            this.listenTo(this.collection, 'add', this.render);
            this.listenTo(this.collection, 'destroy', this.renderAfterDestroy);
        },
    
        render: function () {
            this.pageCount = Math.ceil(this.collection.length / this.pageSize);
            this.$el.empty();
            this.$el.html(this.template());

            this.renderGrid();

            return this;
        },

        renderGrid: function () {
            var tpl = templates.paginationTpl,
                currentModel,
                i;

            this.pageCount = Math.ceil(this.collection.length / this.pageSize);
            this.startPosition = this.pageIndex * this.pageSize;
            this.endPosition = this.startPosition + this.pageSize;

            _.each(this.itemViews, function (view) {
                view.remove();
            });

            for(i = this.startPosition; i < this.endPosition; i ++){
                currentModel = this.collection.models[i];
                if(currentModel) {
                    this.renderOne(currentModel);
                }else {
                    break;
                }
            }

            this.$('nav').html(tpl({
                pageCount: this.pageCount
            }));

            this.$(".pagination li").eq(this.pageIndex).addClass('active');
        },

        renderOne: function (model) {
            var view = new App.Resources.ResourcesModelHomepageView({model: model});
            this.itemViews.push(view);
            this.$('.resource-list').append(view.render().el);
        },

        renderAfterDestroy: function () {
            this.startSearch();
            if(!this.collection.at(this.startPosition)){
             this.pageIndex = this.pageIndex -1;
             }

            this.renderGrid();
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
            } else {
                this.collection.comparator = function(resource) {
                    return resource.get('name');
                };
                this.collection.sort();
            }

            this.renderGrid();
        },

        changePage: function (e) {
            this.pageIndex = e.currentTarget.value - 1;
            this.$(".pagination li").removeClass('active');
            this.renderGrid();
        },

        startSearch: function () {
            var searchRequest = this.$('.searchField').val(),
                filteredArray;
            if (searchRequest !== '') {
                filteredArray = collections.resouresCollection.filter(function (model) {
                    return model.get('name').toLowerCase().indexOf(searchRequest.toLowerCase()) !== -1;
                });
                this.collection = new App.Resources.ResourcesCollection(filteredArray);
            } else {
                this.collection = collections.resouresCollection;
                this.pageIndex = 0;
            }

            this.renderGrid();
        }
    });
})(App.Resources);
