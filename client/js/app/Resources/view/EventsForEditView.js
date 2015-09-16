(function (This) {
    This.EventsForEditView = App.BaseView.extend({
        className: 'modal fade in',
        tpl: templates.eventsForEditTpl,
        itemViews: [],

        events: {
            'click .cancel': 'cancel'
        },

        initialize: function (options) {
            this.resourceModel = options.model;
            this.collection = collections.eventsCollection.filterByResource(this.resourceModel.get('id'));
            this.pageSize = 10;
            this.pageIndex = 0;
            $('body').on('keydown', this.closeOnEscape.bind(this));
        },

        render: function () {
            this.$el.append(this.tpl());
            this.renderGrid();
            return this;
        },

        renderOne: function (model) {
            var itemView = new This.EventItemView({model: model});
            this.$('.event-list').append(itemView.render().$el);
            this.itemViews.push(itemView);
        },

        show: function () {
            this.collection = collections.eventsCollection.filterByResource(this.resourceModel.get('id'));
            this.renderGrid();
            this.$el.removeClass('hidden');
        },

        cancel: function () {
            cs.mediator.publish('EventsForEditViewClosed'); //publish to Controller
            $('body').off();
        },

        closeOnEscape: function (e) {
            if (e.keyCode === ESC) {
                this.cancel();
            }
        }
    });
})(App.Resources);
