(function (This) {
    This.CreateEditView = Backbone.View.extend({
		className: 'modal fade in resourseScroll',
        template: templates.editResourceTpl,

        events: {
			'click .save': 'submit',
            'click .cancel': 'cancel',
			'keydown': 'closeOnEscape',
            'keypress': 'updateOnEnter',
			'click .chekType' : 'chekType'
        },

        initialize: function () {
            this.model = this.model || new This.ResourcesModel(); 
            this.defaultModelJSON = this.model.toJSON();
            Backbone.Validation.bind(this);
			
			$('body').one('keydown', this.closeOnEscape.bind(this));
            $('body').one('keypress', this.updateOnEnter.bind(this));
        },

        render: function () {
            var resourceTypes = collections.resourceTypes.toJSON(),
			    type = this.model.get('type'),
			    classForHide = 'hide';
				
				if(type === 0) {
				    classForHide = "";
			    }

            this.$el.append(this.template({
                name: this.model.get('name'),
                typeId: this.model.get('type'),
                resourceTypes: resourceTypes,
				dateStart: this.model.get('dateStart'),
				dateFinish: this.model.get('dateFinish'),
				classForHide: classForHide,
                useInSchedule: this.model.get('useInSchedule')
            }));
			

			this.$("#datetimepickerStart").datetimepicker({
				locale: 'ru',
				format: 'YYYY.MM.DD'
			});
			
			this.$("#datetimepickerFinish").datetimepicker({
				locale: 'ru',
				format: 'YYYY.MM.DD'
			});
			
			this.$("[name='resourseCheckbox']").bootstrapSwitch();
			
            return this;
        },

        submit: function () { 
            var isNewModel = this.model.isNew();
            this.$nameValue = this.$('.name').val();

            if(!isNewModel && this.$nameValue === this.model.get('name')) {
                this.save();
            } else {
                this.checkResourceName(this.$nameValue);
            }
        },

        checkResourceName: function (value) {
            if (!isNameTaken(value, collections.resouresCollection.toJSON())) {
                this.save();
            } else {
                cs.mediator.publish('Hint','This name is already taken', this.$('.name'));
            }
        },

        save: function () {
            var $typeValue = this.$('.type').val()? Number(this.$('.type').val()): '', 
                isNewModel = this.model.isNew(),
			    dateStart = '2015.01.01',
				dateFinish = '2015.01.01',
                user = User.get(),
                attributes;
			
            if(this.$('.type').val() === '0') {
				dateStart = this.$('#dateStart').val();
				dateFinish = this.$('#dateFinish').val();
			}				

            attributes = {
                name: this.$nameValue,
                type: $typeValue,
                locationCountry: user.locationCountry,
                locationCity: user.locationCity,
				dateStart: dateStart,
				dateFinish: dateFinish,
                useInSchedule: this.$('input[type=checkbox]').is(":checked")
            };

            if (!this.preValidate(attributes)) {
                this.model.save(attributes);
                collections.resouresCollection.add(this.model);
				
                cs.mediator.publish( //publish to Messenger's Controller
                    'Notice',
                    isNewModel? 'You succesfully added a new resource': 'Information succesfully changed'
                );
				
				this.changeClassAndCancel();
            }
        },

        preValidate: function (attributes) {
            var attrName,
                validationResult;

            validationResult = this.model.preValidate(attributes);

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
        
		cancel: function () {
            this.undoChanges();
            this.changeClassAndCancel();
        },
		
		changeClassAndCancel: function () {
			$('.myAnimateClass').removeClass('slideInDown').addClass('fadeOutUp');
			setTimeout(function() {
			    cs.mediator.publish('ResourcesViewClosed'); //publish to Controller and router
			}, 400); 
		},

        undoChanges: function () {
            this.model.off('change', this.preValidate);
            this.model.set(this.defaultModelJSON);
        },
		
		closeOnEscape: function (e) {
            if (e.keyCode === ESC) {
                this.changeClassAndCancel();
            }
        },

        updateOnEnter: function (e) {
            if (e.keyCode === ENTER) {
                this.save();
            }
        },
		
		chekType: function () {
			var type = this.$('.type').val();
			if(type === '0') {
				$('.hideData').removeClass('hide');
			} else {
				$('.hideData').addClass('hide');
			}
		}
    });
})(App.Resources);
