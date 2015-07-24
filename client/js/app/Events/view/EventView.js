'use strict';
(function (This) {
    This.EventView = Backbone.View.extend({
        tagName: 'li',
        tpl: eventTpl,

        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));

            return this;
        }

    });
})(App.Events);