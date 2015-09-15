(function (This) {
    This.CreateEditView = Backbone.View.extend({
		className: 'modal fade in eventsScroll',
        template: templates.editEventTpl,
        resourceItemTpl: templates.resourceItemTpl,

        events: {
            'click .save': 'save',
            'click .cancel': 'cancel',
            'click .resource': 'removeResource',
            'keydown': 'closeOnEscape',
            'keydown': 'tabKeySwitch',
            'keypress': 'updateOnEnter',
            'change .editName': 'setName',
            'click .returnName': 'returnName'
        },

        initialize: function () {
            this.model = this.model || new This.Event();
            this.resourceCollection = collections.resouresCollection;
            this.resourceSorting();
            
            this.resourcesCollectionView = new App.Events.ResourcesCollectionView({ model: this.model });

            Backbone.Validation.bind(this);

            $('body').on('keypress', this.updateOnEnter.bind(this));
			$('body').on('keydown', this.closeOnEscape.bind(this));

            cs.mediator.subscribe('resourceAddedToEvent', this.addResourceIdToEvent, null, this);
            cs.mediator.subscribe('resourceAddedToEvent', this.generateEventName, null, this);
        },

        render: function () {
            var eventTypes = collections.eventTypes.toJSON();
            this.$el.append(this.template({
                name: this.model.get('name'),
                typeId: this.model.get('type'),
                eventTypes: eventTypes,
                resourcesList: this.getResourcesInEvent()
            }));
            this.$('.resources-list').append(this.resourcesCollectionView.render().el);
             $('body').css('overflow-y', 'hidden');
			
            this.setTabIndex();
            this.setUpPreviousName();
            
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
			var $typeValue = this.$('.type').val()? Number(this.$('.type').val()): '',
                $nameValue = this.$('.name').val(), 
                isNewModel = this.model.isNew(),
                user = User.get(),
                attributes;

                attributes = {
                    name: $nameValue,
                    type: $typeValue,
					locationCity: user.locationCity,
                    resources: getIdResourcesArray()
                };

            if (!this.preValidate(attributes)) {
                this.model.save(attributes);
                collections.eventsCollection.add(this.model);
				
                cs.mediator.publish( //publish to Messenger's Controller
                    'Notice',
                    isNewModel? 'You succesfully added a new event': 'Information succesfully changed'
                );
				$('.shortInfo').removeClass('warning');
			    $('.toshow').addClass('hidden');
				$('.toshowfirst').switchClass('col-md-8', 'col-md-12', 1000);
	
				this.changeClassAndCansel();
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

        preValidate: function (attributes) {
            var attrName,
                validationResult;

            validationResult = this.model.preValidate(attributes);

            if (validationResult) {
                for (attrName in validationResult) {
                    cs.mediator.publish(  
                        'Hint',
                        validationResult[attrName],
                        this.$('[name=' + attrName + ']')
                    );
                }
            }
            return validationResult;
        },

		cancel: function () {
            if (this.model.isNew()){
                this.model.destroy();
            }
			cs.mediator.remove('resourceAddedToEvent');
			this.changeClassAndCansel();
        },
		
		changeClassAndCansel: function () {
            $('.myAnimateClass').removeClass('slideInDown').addClass('fadeOutUp');
			setTimeout(function() {
			   $('body').css('overflow-y', 'auto');
			   cs.mediator.publish('CreateEditViewClosed');
			}, 400);

            this.remove();

            $('body').off();
		},

        removeResource: function (e) {
            var resource = e.target;
            this.removeEventName(resource.getAttribute('idValue'));
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
        },
				
		closeOnEscape: function (e) {
            if (e.keyCode === ESC) {
                this.cancel();
            }
        },
        
        setUpPreviousName: function () {
            var name = this.$('.name').val();
            
            if (name !== '') {
                this.prevName = name;
                this.isChanged = true;
            }
        },
        
        generateEventName: function (_resource) {
            var $name = $('.name'),
                resource = _resource.toJSON();
            
            if (resource.type === 0) {
                if (this.isChanged) {
                    $name.val('');
                    this.isChanged = false;
                }
                
                if ($name.val() === '') {
                    $name.val(resource.name);    
                } else {
                    $name.val($name.val() + ', ' + resource.name);
                }                
            }
        },
        
        removeEventName: function (_id) {
            var $name = $('.name'),
                id = Number(_id);
            
            _.each(this.resourceCollection.toJSON(), function (resource) {
                if (resource.id === id && resource.type === 0) {
                    var eventName = $name.val(),
                        newName = '';
                    
                    newName = eventName.replace(resource.name, '');
                    
                    if (newName[newName.length - 2] === ',') {
                        newName = newName.substring(0, newName.length - 2);
                    }
                    
                    if (newName[0] === ',') {
                        newName = newName.substring(2);
                    }
                    
                    $name.val(newName);
                }
            });
        },
        
        setName: function () {
            var $name = $('.name'),
                name = $name.val();
            
            if (name !== '') {
                this.prevName = name;
            }
            this.isChanged = true;
        },
        
        returnName: function () {
            var $name = $('.name'),
                name = $name.val();
            
            if (this.prevName !== '') {
                $name.val(this.prevName);
                this.isChanged = true;
            }
        },
        
        setTabIndex: function () {
            this.$('.tabIndex').each(function (num, el) {
                el.tabIndex = num + 1;
            });    
        },
        
        tabKeySwitch: function (e) {
            if (e.keyCode === 9) {
                if ($('.lastTabBtn').is(':focus')) {
                    e.preventDefault();
                    $('.name').focus();
                }
            }
        }
    });
})(App.Events);