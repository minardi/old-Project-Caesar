(function (This) {
    This.CollectionView = Backbone.View.extend({
        tagName: 'div',

        className: 'holiday',

        template: templates.holidaysCollectionTpl,

        itemViews: [],

        events: {
            'click .create': 'create',
            'click .countryFilter': 'filterHandler',
            'keyup .searchField': 'startSearch'
        },

        initialize: function () {
            cs.mediator.subscribe('HolidaySaved', this.updateCollection, {}, this); //published from CreateEditView
            cs.mediator.subscribe('CountryCreated', this.render, {}, this); //published from CountryCollectionView
            cs.mediator.subscribe('CountryDeleted', this.render, {}, this); //published from itemView
            cs.mediator.subscribe('HolidayCreated', this.render, {}, this); //published from CreateEditView
        },

        updateCollection: function (model) {
            var view = new This.HolidaysModelHomepageView({model: model}).render();
            this.collection.add(model);
            $('.holidays-list').append(view.$el);
        },

        render: function (HolidayArray) {
            var collection;

            if (HolidayArray) {
                collection = new App.Holidays.HolidaysCollection(HolidayArray);
            } else {
                collection = this.collection;
            }

            this.$el.empty().html(this.template({
                counties: collections.countriesCollection.toJSON()
            }));
            collection.each(function (holiday) {
                this.renderOne(holiday);
            }, this);

            return this;
        },


        renderOne: function (model) {
            var view = new This.HolidaysModelHomepageView({model: model});
            this.$('.holidays-list').append(view.render().el);
        },

        create: function () {
            cs.mediator.publish('CreateHoliday'); //publish to Controller
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

        filterHandler: function (e) {
            var filter = e.target.classList[0],
                filteredCollection;

            if (filter === 'all') {
                this.render();
            } else {
                filteredCollection = this.collection.where({locationCountry: Number(filter)});
                this.render(filteredCollection);
            }
        },

        startSearch: function () {
            var searchRequest = this.$('.searchField').val(),
                searchPattern,
                filteredArray;
            if (searchRequest !== '') {
                searchPattern = new RegExp(searchRequest, 'gi');
                filteredArray = this.collection.filter(function (model) {
                    return searchPattern.test(model.get('name'));
                });

                this.render(filteredArray);
                this.$('.searchField').val(searchRequest);
                this.$('.searchField').focus();
            } else {
                this.render()
            }
        }
    });
})(App.Holidays);
