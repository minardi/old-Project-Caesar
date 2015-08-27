(function (This) {
    This.CollectionView = BaseView.extend({
        tagName: 'div',
        className: 'holiday',
        template: templates.holidaysCollectionTpl,
        itemViews: [],

        //methods: renderGrid, startSearch, changePage, show, renderAfterDestroy - are in BaseView
        events: {
            'click .create': 'create',
            'click .countryFilter': 'filterHandler',
            'click .pageEl': 'changePage',
            'keyup .searchField': 'startSearch'
        },

        initialize: function () {
            this.collection = collections.holidaysCollection;
            this.originCollection = collections.holidaysCollection;
            this.pageSize = 15;
            this.pageIndex = 0;
            this.listenTo(this.collection, 'add', this.renderGrid);
            this.listenTo(collections.countriesCollection, 'all', this.render);
        },

        render: function () {
			var user = User.get();
            this.$el.empty().append(this.template({
                counties: collections.countriesCollection.toJSON(),
				role:  user.role
            }));
            this.renderGrid();

            return this;
        },

        renderOne: function (model) {
            var view = new This.HolidaysModelHomepageView({model: model});
            this.$('.holidays-list').append(view.render().el);
            this.itemViews.push(view);
        },

        create: function () {
            cs.mediator.publish('CreateHoliday'); //publish to Controller
        },

        filterHandler: function (e) {
            var filter = e.target.classList[0];

            if (filter === 'all') {
                this.collection = collections.holidaysCollection;
                this.pageIndex = 0;
                this.renderGrid();
            } else {
                this.collection = this.originCollection.filterByCountry(filter);
                this.pageIndex = 0;
                this.renderGrid();
            }
        }
    });
})(App.Holidays);
