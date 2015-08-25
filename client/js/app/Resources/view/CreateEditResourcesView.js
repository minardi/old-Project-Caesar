(function (This) {
    This.CreateEditView = Backbone.View.extend({
		className: 'modal fade in resourseScroll',
        template: templates.editResourceTpl,

        events: {
			'click .save': 'save',
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
				
            return this;
        },

        save: function () {
            var isNewModel = this.model.isNew(),
			    dateStart = '2015.01.01',
				dateFinish = '2015.01.01',
                user = User.get(),
                attributes;
			
            if(this.$('.type').val() === '0') {
				dateStart = this.$('#dateStart').val(),
				dateFinish = this.$('#dateFinish').val();
			}				

            attributes = {
                name : this.$('.name').val(),
                type: Number(this.$('.type').val()),
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

        preValidate: function (atributes) {
            var attrName,
                validationResult,
                errors;

                errors = this.model.preValidate(atributes);

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

            return validationResult;
        },
		
		cancel: function () {
            this.undoChanges();
            this.changeClassAndCancel();
        },
		
		changeClassAndCancel: function () {
			$('.myAnimateClass').removeClass('slideInDown').addClass('fadeOutUp');
			setTimeout(function() {
			    cs.mediator.publish('ResourcesViewClosed'); //publish to Controller
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
