'use strict';
(function (This){
    This.ResourceView = Backbone.View.extend({
        tagName: 'li',

        events: {
            'click': 'selectResource'
        },

        render: function () {
            this.$el.html(this.model.get('id') + '   ' + this.model.get('name'));

            return this;
        },

        selectResource: function () {
            cs.mediator.publish('resourceAddedToEvent', this.model);
            this.remove();
        }

    });
})(App.Events);