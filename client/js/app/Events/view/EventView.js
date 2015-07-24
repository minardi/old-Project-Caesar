'use strict';
(function (This) {
    This.EventView = Backbone.View.extend({
        tagName: 'li',
        className: 'list-group-item',
        tpl: eventTpl,

        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));

            return this;
        }

    });
})(App.Events);