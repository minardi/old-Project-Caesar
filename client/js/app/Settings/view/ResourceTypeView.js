'use strict';
(function (This) {
    This.ResourceTypeView = Backbone.View.extend({
        tagName: 'li',

        render: function () {
            this.$el.html(this.model.get('type'));

            return this;
        }

    });
})(App.Settings);