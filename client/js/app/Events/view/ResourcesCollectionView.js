'use strict';
(function (This) {
    This.ResourcesCollectionView = Backbone.View.extend({
        tagName : 'ul',

        initialize: function (options) {
            this.eventModel = options.model;
            this.listenTo(this.collection, 'add', this.renderOne, this);
        },
        render: function () {
            return this;
        },

        renderOne: function (resource) {
            var modelView = new App.Events.ResourceView({model: resource}),
                resourcesIdArray = this.eventModel.get('resources');

            //figure out if Event(this.eventModel) consist id current resource
            if(resourcesIdArray.indexOf(resource.get('id')) === -1  ) {
                this.$el.append(modelView.render().el);
            }
        }
    });
})(App.Events);