(function (This) {
    This.CreateEditView = Backbone.View.extend({
        className: 'modal fade in',
        template: editEventTpl,

        events: {
            'click .save': 'save',
            'click .cancel': 'cancel'
        },

        initialize: function () {
            this.model = this.model || new This.Event();
            this.modelBinder = new Backbone.ModelBinder();
            cs.mediator.subscribe('resourceAddedToEvent', this.addResourceIdToEvent, null, this);
            this.collection = new App.Resources.ResourcesCollection();
            this.collection.fetch();
            this.resourcesCollectionView = new App.Events.ResourcesCollectionView({
                collection: this.collection,
                model: this.model
            });

            Backbone.Validation.bind(this);

        },

        render: function () {
            this.$el.append(this.template);
            this.$('.resources-list').append(this.resourcesCollectionView.render().el);

            this.modelBinder.bind(this.model, this.el);

            return this;
        },

        addResourceIdToEvent: function (resource) {
            var value = this.$('.resource-field').val();
            this.$('.resource-field').val(value + ',' + resource.get('id'));
        },

        save: function () {
            this.isNewModel = this.model.isNew();

            if (this.isNewModel) {
                this.model.once('sync', function () {
                    cs.mediator.publish('EventSaved', this.model);
                }, this);
            }

            this.model.save();
            cs.mediator.publish('CreateEditViewClosed');
        },

        cancel: function () {
            if (this.isNewModel) {
                this.model.destroy();
                this.collection.remove(this.model);
            }

            this.undoChanges();
            cs.mediator.publish('CreateEditViewClosed');
        },

        undoChanges: function () {
            this.modelBinder.unbind();
            this.model.set(this.model.toJSON());
        }

    });
})(App.Events);