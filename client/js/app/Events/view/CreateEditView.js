(function (This) {
    This.CreateEditView = Backbone.View.extend({
        className: 'modal fade in',
        template: templates.editEventTpl,
        resourceItemTpl: templates.resourceItemTpl,

        events: {
            'click .save': 'save',
            'click .cancel': 'cancel',
            'click .resource': 'removeResource'
        },

        initialize: function (options) {
            this.model = options.model || new This.Event();
            this.resourceCollection = options.resourceCollection;
           
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
			var user = User.get();
			
            this.isNewModel = this.model.isNew();

            if (!this.preValidate()) {

                var attributes = {
                    name : this.$('.name').val(),
                    type: this.$('.type').val(),
					locationCountry: user.locationCountry,
					locationCity: user.locationCity,
                    resources: getIdResourcesArray()
                };

                this.model.save(attributes);
                collections.eventsCollection.add(this.model);

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
              var input = $('.editName'),
                select =  $('.editType'),
                validationResult,
                errors = {},

                errors = this.model.preValidate({
                    name: this.$('.name').val(),
                    type: this.$('.type').val()
                });

                $('.editName').parent().removeClass('has-error');
                $('.editType').parent().removeClass('has-error');

                $('.tooltip-arrow').removeClass('myTooltip');
                $('.tooltip-inner').removeClass('myTooltipInner');

                remove ();

                function remove () {
                    input.tooltip('destroy');
                    select.tooltip('destroy');
                }

                function toolTip (place) {
                    var  formGroup = place.parents('.form-group');

                    place.tooltip({
                        trigger: 'manual',
                        placement: 'top',
                        title: 'Field cannot be empty'
                    }).tooltip('show');
					
                    setTimeout(remove, 5000);
                }

                if(errors) {

                    if (errors.name) {
                        $('.editName').parent().addClass('has-error');

                        toolTip(input);
                    }

                    if (errors.type) {
                        $('.editType').parent().addClass('has-error');

                        toolTip(select);
                    }
                }
                validationResult = errors;

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