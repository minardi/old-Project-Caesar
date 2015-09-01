var BaseView = Backbone.View.extend({
    originCollection: '',

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

        if(!this.collection.models[this.startPosition]){
            this.pageIndex -= 1;
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

        this.$('nav').html(tpl({
            pageCount: this.pageCount
        }));

        this.$(".pagination li").eq(this.pageIndex).addClass('active');
    },

    renderAfterDestroy: function (model) {
        this.collection.remove(model);
        this.renderGrid();
    },

    startSearch: function (e) {
        var searchRequest = $(e.target).val();

        if (searchRequest !== '') {
            this.collection = this.originCollection.filterForSearch(searchRequest);
            this.pageIndex = 0;
        } else {
            this.initialize();
        }

        this.renderGrid();
    },

    changePage: function (e) {
        this.pageIndex = e.currentTarget.value - 1;
        this.$(".pagination li").removeClass('active');
        this.renderGrid();
    },

    show: function () {
        this.$el.removeClass('hidden');
    },

    sortByName: function (e) {
        var flag = 'nameFlag',
            sortingAttribute = 'name',
            $el = this.$('.name-header');
        this.sortFunction(flag, sortingAttribute, $el);
        this.renderGrid();
        e.preventDefault();
    },

    sortByType: function () {
        var flag = 'typeFlag',
            sortingAttribute = 'type',
            $el = this.$('.type-header');

        this.sortFunction(flag, sortingAttribute, $el);
        this.renderGrid();
    },

    sortFunction: function (flag, field, $el) {
        if (this[flag] === 'ASC') {
            this.collection.comparator = function (a, b) {
                var firstValue = a.get(field),
                    secondValue = b.get(field);

                return firstValue < secondValue ? -1 : 1;
            };

            this[flag] = 'DESC';
            this.$('.sort-flag').removeClass('glyphicon-triangle-top').removeClass('glyphicon-triangle-bottom');
            $el.find('.sort-flag').addClass('glyphicon-triangle-bottom');
        } else {
            this.collection.comparator = function (a, b) {
                var firstValue = a.get(field),
                    secondValue = b.get(field);

                return firstValue > secondValue ? -1 : 1;
            };
            this[flag] = 'ASC';
            this.$('.sort-flag').removeClass('glyphicon-triangle-top').removeClass('glyphicon-triangle-bottom');
            $el.find('.sort-flag').addClass('glyphicon-triangle-top');
        }

        this.collection.sort({silent: true});
    }
});
