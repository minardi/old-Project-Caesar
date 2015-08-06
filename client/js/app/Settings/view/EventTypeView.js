'use strict';
(function (This) {
    This.EventTypeView = Backbone.View.extend({
        tagName: 'li',
        
        render: function () {
            this.$el.html(this.model.get('name'));

            return this;
        }
        
    });
})(App.Settings);