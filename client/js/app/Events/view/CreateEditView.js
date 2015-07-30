(function (This) {
    This.CreateEditView = Backbone.View.extend({
        className: 'modal fade in',
        template: editEventTpl,
        resourceOptionTpl: resourceOptionTpl,

        events: {
            'click .save': 'save',
            'click .cancel': 'cancel'
        },

        initialize: function (options) {
            this.model = this.model || new This.Event();
            this.defaultModelJSON = this.model.toJSON();
            this.modelBinder = new Backbone.ModelBinder();
            cs.mediator.subscribe('resourceAddedToEvent', this.addResourceIdToEvent, null, this);
            this.resourceCollection = options.resourceCollection;

            this.resourcesCollectionView = new App.Events.ResourcesCollectionView({
                collection: this.resourceCollection,
                model: this.model
            });

            Backbone.Validation.bind(this);

        },

        render: function () {
            this.$el.append(this.template({resourcesList: this.getResourcesInEvent()}));
            this.$('.resources-list').append(this.resourcesCollectionView.render().el);



            var converter = function (direction, value) {
                var result;

                if (direction === 'ViewToModel') {
                    result = _.map(value, function (number) {
                        return parseInt(number);
                    })
                }
                return result;
            };
            var bindings = {
                name: '[name=name]',
                type : '[name=type ]',
                resources : {selector: '[name=resources ]',converter: converter}
            };

            this.modelBinder.bind(this.model, this.el, bindings);

            return this;
        },

        //get array of resources models in current event by their id
        getResourcesInEvent: function () {
            var resources = this.model.get('resources'), // array of id resources in event
                filtered;

            filtered = this.resourceCollection.filter(function (model) {
                return resources.indexOf(model.get('id')) !== -1;
            });

            return filtered;
        },

        addResourceIdToEvent: function (resourceModel) {
            this.$('.resource-field').append(this.resourceOptionTpl(resourceModel.toJSON()));
        },

        save: function () {
            this.isNewModel = this.model.isNew();
            $('.resource-field .option').trigger('click');
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
            this.model.set(this.defaultModelJSON);
        }

    });
})(App.Events);