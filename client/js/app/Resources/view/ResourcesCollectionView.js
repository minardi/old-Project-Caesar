(function (This) {
    This.CollectionView = App.BaseView.extend({
        tagName: 'div',
        className: 'resource',
        template: templates.resourceCollectionTpl,
        itemViews: [],

        //methods: renderGrid, startSearch, changePage, show, renderAfterDestroy, sortByName - are in the BaseView
        events: {
            'click .create': 'create',
            'click .pageEl': 'changePage',
            'click .name-header': 'sortByName',
            'click .type-header': 'sortByType',
            'keyup .searchField': 'startSearch'
        },
    
        initialize: function () {
            this.collection = collections.resouresCollection;
            this.originCollection = collections.resouresCollection;
            this.pageSize = 10;
            this.pageIndex = 0;
            this.nameFlag = 'DESC';
            this.typeFlag = 'ASC';
            this.listenTo(this.collection, 'add', this.render);
            this.listenTo(this.collection, 'destroy', this.renderAfterDestroy);
            this.listenTo(collections.resouresCollection, 'add', this.render);
        },
    
        render: function () {
            this.pageCount = Math.ceil(this.collection.length / this.pageSize);
            this.$el.empty();
            this.$el.html(this.template());
            this.renderGrid();
            return this;
        },

        renderOne: function (model) {
            var view = new App.Resources.ResourcesModelHomepageView({model: model});
            this.itemViews.push(view);
            this.$('.resource-list').append(view.render().el);
        },

        create: function () {
            cs.mediator.publish('CreateResource'); //publish to Controller
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
        }
    });
})(App.Resources);
