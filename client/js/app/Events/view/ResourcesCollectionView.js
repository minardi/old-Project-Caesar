'use strict';
(function (This) {
    This.ResourcesCollectionView = Backbone.View.extend({
        tagName: 'ul',
        className: 'list-group',

        initialize: function (options) {
            this.collection = collections.resouresCollection;
            this.eventModel = options.model;
        },

        render: function () {
            this.collection.each(function (model) {
                this.renderOne(model);
            }, this);

            return this;
        },

        renderOne: function (resource) {
            var modelView = new App.Events.ResourceView({model: resource}),
                resourcesIdArray = this.eventModel.get('resources');

            //figure out if Event(this.eventModel) consist id current resource
            if (resourcesIdArray.indexOf(resource.get('id')) === -1) {
                this.$el.append(modelView.render().el);
            }
        },

        renderRemoved: function (id) {
            var modelView = new App.Events.ResourceView({model: this.collection.get(id)});

            this.$el.append(modelView.render().el);
        }
    });
})(App.Events);