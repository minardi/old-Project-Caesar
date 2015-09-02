'use strict';
(function (This) {
    This.EventTypeCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-md-3',
        tpl: templates.eventTypeTpl,

        events: {
            'keypress .new-type': 'createNewType',
            'click .addEventSettings': 'saveCity',
            'input .new-type' : 'focus'
        },

        initialize: function () {
            this.model = new This.EventType();
            Backbone.Validation.bind(this);
            this.collection = collections.eventTypes;
            this.listenTo(this.collection, 'add', this.renderOne);
			cs.mediator.subscribe('UpdateEvents', this.updateCollection, {}, this);
        },
        
        render: function () {
			this.count = 0;
            this.$el.html(this.tpl);
            this.collection.each(function (model) {
                this.renderOne(model);
            }, this);

            return this;
        },

        renderOne: function (model) {
            var eventTypeView = new App.Settings.ItemView({model: model});
            this.$('.event-type').append(eventTypeView.render().el);
			this.count++;
			this.showScroll();

            return this;
        },
		
		showScroll: function () {
			var docHeight = $(document).height(),
			    boxHeight = docHeight - 226 + 'px',
			    divHeight = 140 + 84 + (45 * this.count),
                $eventsScroll = this.$('#eventsScroll');
			
			if(divHeight >= docHeight) {
			    $eventsScroll.addClass('showScroll');
				this.$('.showScroll').css('height', boxHeight)
			} else {
				$eventsScroll.removeClass('showScroll');
			}
		},

        save: function () {
            var ENTER = 13,
                attributes = {
                    name: this.$eventType.val().trim()
                };

            if (!this.preValidate(attributes)) {
                this.collection.create(attributes);
                this.$eventType.val('');
            }
        },

        createNewType: function (e) {
            this.$eventType = this.$('.new-type');
            if(e.which !== ENTER || !this.$eventType.val().trim()){
                return;
            }
            this.save();
        },
		
		updateCollection: function (){
            this.render();  
        },

        focus: function () {
            this.$eventType.focus();
        },
		
		saveCity: function () {
            this.save();
		},

        preValidate: function (attributes) {
            var attrName,
                validationResult;

            validationResult = this.validateName() || this.model.preValidate(attributes);

            if (validationResult) {
                for (attrName in validationResult) {
                    cs.mediator.publish(   //publish to Messenger's Controller
                        'Hint',
                        validationResult[attrName],
                        this.$('[name=' + attrName + ']')
                    ); 
                }
            }

            return validationResult;
        },

        isNameTaken: function (value) {
            var eventsType = collections.eventTypes.toJSON(),
                eventsTypeNames = [],
                result;

            eventsType.forEach(function (element) {
                eventsTypeNames.push(element['name']);
            });
                        
            result = _.contains(eventsTypeNames, value);
            return result;
        },

        validateName: function () {
            var errorMsg = {name: 'This name is already taken'},
                result = this.isNameTaken(this.$eventType.val())? errorMsg: undefined;

            return result;
        }
    });
})(App.Settings);