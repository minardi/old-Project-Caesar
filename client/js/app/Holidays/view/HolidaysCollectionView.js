(function (This) {
    This.CollectionView = App.BaseView.extend({
        tagName: 'div',
        className: 'holiday',
        template: templates.holidaysCollectionTpl,
        itemViews: [],

        //methods: renderGrid, startSearch, changePage, show, renderAfterDestroy - are in BaseView
        events: {
            'click .create': 'create',
            'click .countryFilter': 'filterHandler',
            'click .pageEl': 'changePage',
            'keyup .searchField': 'startSearch',
            'click .name-header': 'sortByName',
            'click .location-header': 'sortByLocation',
            'click .date-header': 'sortByDate',
			'keypress': 'updateOnEnter'
        },

        initialize: function () {
            this.collection = collections.holidaysCollection;
            this.originCollection = collections.holidaysCollection;
            this.settingsCollection = collections.countriesCollection;
            this.pageSize = 10;
            this.pageIndex = 0;
            this.listenTo(this.collection, 'add', this.renderGrid);
            this.listenTo(this.collection, 'destroy', this.renderAfterDestroy);
            this.listenTo(collections.countriesCollection, 'all', this.render);
			this.listenTo(collections.holidaysCollection, 'all', this.render);
			$('body').one('keypress', this.updateOnEnter.bind(this));
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
        },

        sortByLocation: function () {
            var flag = 'locationFlag',
                sortingAttribute = 'locationCountry',
                $el = this.$('.location-header');

            this.sortById(flag, sortingAttribute, $el);
            this.renderGrid();
        },

        sortByDate: function () {
            var flag = 'dateFlag',
                sortingAttribute = 'date',
                $el = this.$('.date-header');

            this.sortFunction(flag, sortingAttribute, $el);
            this.renderGrid();
        },
		
		updateOnEnter: function (e) {
            if (e.keyCode === ENTER) {
                e.preventDefault();
            }
        }
    });
})(App.Holidays);
