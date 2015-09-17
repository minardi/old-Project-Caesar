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
			
			$('body').on('keydown', this.closeOnEscape.bind(this));
            $('body').on('keypress', this.updateOnEnter.bind(this));
        },

        render: function () {
            var resourceTypes = collections.resourceTypes.toJSON(),
                isNewModel = this.model.isNew(),
			    type = this.model.get('type'),
                startDate = this.model.get('dateStart'),
			    classForHide = 'hide';
				
				if(type === 0) {
				    classForHide = "";
			    }

            this.$el.append(this.template({
                name: this.model.get('name'),
                typeId: type,
                resourceTypes: resourceTypes,
				dateStart: startDate,
				dateFinish: this.model.get('dateFinish'),
				classForHide: classForHide,
                useInSchedule: this.model.get('useInSchedule')
            }));
			

			this.$("#datetimepickerStart").datetimepicker({
				locale: 'en',
				format: 'MM/DD/YYYY',
                minDate: isNewModel? getToday() : startDate
                
			});
			
			this.$("#datetimepickerFinish").datetimepicker({
				locale: 'en',
				format: 'MM/DD/YYYY',
                minDate: isNewModel? getToday() : startDate
			});
			
			this.$("[name='resourseCheckbox']").bootstrapSwitch();
			$('body').css('overflow-y', 'hidden');
			
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
                $nameValue = this.$('.name').val().trim(),
			    $dateStart = this.model.get('dateStart'),
				$dateFinish = this.model.get('dateFinish'),
                $isChecked = this.$('input[type=checkbox]').is(":checked"),
                isNewModel = this.model.isNew(),
                user = User.get(),
                attributes;

                if ($typeValue === 0) {
                    $dateStart = this.$('#dateStart').val();
                    $dateFinish = this.$('#dateFinish').val();
                }				

            attributes = {
                name: $nameValue,
                type: $typeValue,
                locationCity: user.locationCity,
				dateStart: $dateStart,
				dateFinish: $dateFinish,
                useInSchedule: $isChecked
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
            $('body').off();
        },
		
		changeClassAndCancel: function () {
			$('.myAnimateClass').removeClass('slideInDown').addClass('fadeOutUp');
			setTimeout(function() {
				$('body').css('overflow-y', 'auto');
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
                this.submit();
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
