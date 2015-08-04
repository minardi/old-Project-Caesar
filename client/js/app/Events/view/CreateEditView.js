(function (This) {
    This.CreateEditView = Backbone.View.extend({
        className: 'modal fade in',
        template: editEventTpl,
        resourceItemTpl: resourceItemTpl,

        events: {
            'click .save': 'save',
            'click .cancel': 'cancel',
            'click .resource': 'removeResource'
        },

        initialize: function (options) {
            this.model = options.model || new This.Event();
            this.resourceCollection = options.resourceCollection;
            this.model.once('sync', function () {
                cs.mediator.publish('EventSaved', this.model);
            }, this);
            this.resourcesCollectionView = new App.Events.ResourcesCollectionView({
                collection: this.resourceCollection,
                model: this.model
            });

            cs.mediator.subscribe('resourceAddedToEvent', this.addResourceIdToEvent, null, this);

            Backbone.Validation.bind(this);

        },

        render: function () {
            var eventTypes = collections.eventTypes.toJSON();

            this.$el.append(this.template({
                name: this.model.get('name'),
                eventTypes: eventTypes,
                resourcesList: this.getResourcesInEvent()
            }));
            this.$('.resources-list').append(this.resourcesCollectionView.render().el);

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
            this.$('.resource-field').append(this.resourceItemTpl(resourceModel.toJSON()));
        },

        save: function () {
            this.isNewModel = this.model.isNew();

            if (true) {
                var attributes = {
                    name : this.$('.name').val(),
                    type: this.$('.type').val(),
                    resources: getIdResourcesArray()

                };

                this.model.save(attributes);

                cs.mediator.publish( //publish to Messenger's Controller
                    'Notice',
                    this.isNewModel? 'You succesfully added a new event': 'Information succesfully changed'
                );

                cs.mediator.publish('CreateEditViewClosed');
            }

            // return array of Integer values resources ID in current event
            function getIdResourcesArray () {
                var idArray = [];
                $('.resource-field  li').each(function (i, el) {
                    idArray.push(parseInt(el.getAttribute('idValue')));
                });
                return idArray;
            }

        },

        preValidate: function (e) {
            var attrName,
                errorMessage,
                validationResult,
                errors = {};

            if (e) {
                attrName = e.target.name;
                errorMessage = this.model.preValidate(attrName, this.model.get(attrName));

                if (errorMessage) {
                    cs.mediator.publish(   //publish to Messenger's Controller
                        'Hint',
                        errorMessage,
                        this.$('[name=' + attrName + ']')
                    ); 
                }

                validationResult = errorMessage;
            } else {
                errors = this.model.preValidate({
                    name: this.model.get('name'),
                    type: this.model.get('type')
                });

                if (errors) {
                    for (attrName in errors) {
                        cs.mediator.publish(   //publish to Messenger's Controller
                            'Hint',
                            errors[attrName],
                            this.$('[name=' + attrName + ']')
                        ); 
                    }
                }
                validationResult = errors;
            }

            return validationResult;
        },

        cancel: function () {
            cs.mediator.publish('CreateEditViewClosed');
        },

        removeResource: function (e) {
            var resource = e.target;
            this.resourcesCollectionView.renderRemoved(parseInt(resource.getAttribute('idValue')));
            resource.remove();

        }


    });
})(App.Events);