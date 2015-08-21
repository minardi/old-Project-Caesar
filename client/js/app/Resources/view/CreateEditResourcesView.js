(function (This) {
    This.CreateEditView = Backbone.View.extend({
        template: templates.editResourceTpl,

        events: {
            'keypress': 'updateOnEnter',
			'click .chekType' : 'chekType'
        },

        initialize: function () {
            this.model = this.model || new This.ResourcesModel(); 
            this.defaultModelJSON = this.model.toJSON();
            Backbone.Validation.bind(this);
        },

        render: function () {
            var resourceTypes = collections.resourceTypes.toJSON(),
			    type = this.model.get('type'),
			    classForHide = 'hide',
				_this = this;
				
				if(type === '0') {
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
				
				

				this.$('#resourseModal').modal('show');			
				
				 this.$('#save').click(function () {
					 _this.save();		
				 });
				 
				 
				this.$('#resourseModal').on('hidden.bs.modal', function (e) {
		            cs.mediator.publish('ResourcesViewClosed', 'ShowResources'); //publish to Controller
				})

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
                type: this.$('.type').val(),
                locationCountry: user.locationCountry,
                locationCity: user.locationCity,
				dateStart: dateStart,
				dateFinish: dateFinish,
                useInSchedule: this.$('input[type=checkbox]').is(":checked")
            };

            if (!this.preValidate(attributes)) {
                this.model.save(attributes);
                collections.resouresCollection.add(this.model);
				
				$('#resourseModal').modal('hide');
				
                cs.mediator.publish( //publish to Messenger's Controller
                    'Notice',
                    isNewModel? 'You succesfully added a new resource': 'Information succesfully changed'
                );
				

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

        undoChanges: function () {
            this.model.off('change', this.preValidate);
            this.model.set(this.defaultModelJSON);
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
