(function (This) {
    This.CreateEditView = Backbone.View.extend({
        template: templates.editEventTpl,
        resourceItemTpl: templates.resourceItemTpl,

        events: {
            'click .resource': 'removeResource',
            'keypress': 'updateOnEnter'
        },

        initialize: function () {
            this.model = this.model || new This.Event();
            this.resourceCollection = collections.resouresCollection;
            this.resourceSorting();
            
            this.resourcesCollectionView = new App.Events.ResourcesCollectionView({ model: this.model });

            Backbone.Validation.bind(this);

            $('body').one('keypress', this.updateOnEnter.bind(this));

            cs.mediator.subscribe('resourceAddedToEvent', this.addResourceIdToEvent, null, this);
        },

        render: function () {
            var eventTypes = collections.eventTypes.toJSON(),
			    _this = this;

            this.$el.append(this.template({
                name: this.model.get('name'),
                typeId: this.model.get('type'),
                eventTypes: eventTypes,
                resourcesList: this.getResourcesInEvent()
            }));
            this.$('.resources-list').append(this.resourcesCollectionView.render().el);
			
			this.$('#evetModal').modal('show');			
			
			 this.$('#save').click(function () {
				 _this.save();               			
			 });
			 
			this.$('#evetModal').on('hidden.bs.modal', function (e) {
				 cs.mediator.publish('CreateEditViewClosed', 'RouteToEvents');
			})

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
                    type: Number(this.$('.type').val()),
					locationCountry: user.locationCountry,
					locationCity: user.locationCity,
                    resources: getIdResourcesArray()
                };

                this.model.save(attributes);
                collections.eventsCollection.add(this.model);
				
				$('#evetModal').modal('hide');

                cs.mediator.publish( //publish to Messenger's Controller
                    'Notice',
                    this.isNewModel? 'You succesfully added a new event': 'Information succesfully changed'
                );

                
            }

            // return array of resources ID in current event
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
                errors = this.model.preValidate({
                    name: this.$('.name').val(),
                    type: this.$('.type').val()
                });

            input.parent().removeClass('has-error');
            select.parent().removeClass('has-error');

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

        removeResource: function (e) {
            var resource = e.target;
            this.resourcesCollectionView.renderRemoved(parseInt(resource.getAttribute('idValue')));
            resource.remove();
            this.resourceSorting();
        },

        resourceSorting: function () {
            this.resourceCollection.comparator = function(resource) {
                return resource.get('type');
            };
            this.resourceCollection.sort();
        },
        
        remove: function () {
            this.resourcesCollectionView.remove();
            Backbone.View.prototype.remove.call(this, arguments);
        },

        updateOnEnter: function (e) {
            if (e.keyCode === ENTER) {
                this.save();
            }
        }
    });
})(App.Events);