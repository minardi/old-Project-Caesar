(function (This) {
    This.CreateEditView = Backbone.View.extend({
        
        className: 'modal fade in',

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
            $('body').on('keydown', this.closeOnEscape);
            Backbone.Validation.bind(this);
        },

        render: function () {
            var resourceTypes = collections.resourceTypes.toJSON(),
			    type = this.model.get('type'),
			    classForHide = 'hide';
				
				if(type === '0') {
				    classForHide = "";
			    }

            this.$el.append(this.template({
                name: this.model.get('name'),
                type: collections.resourceTypes.get(this.model.get('type')),
                resourceTypes: resourceTypes,
				dateStart: this.model.get('dateStart'),
				dateFinish: this.model.get('dateFinish'),
				classForHide: classForHide
            }));
			
			setTimeout(function () {
                $("#datetimepickerStart").datetimepicker({
                    locale: 'ru',
                    format: 'YYYY.MM.DD'
                });
				
				$("#datetimepickerFinish").datetimepicker({
                    locale: 'ru',
                    format: 'YYYY.MM.DD'
                });
            }, 0);

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
				dateFinish: dateFinish
            };

            if (!this.preValidate(attributes)) {
                this.model.save(attributes);
                collections.resouresCollection.add(this.model);
                cs.mediator.publish( //publish to Messenger's Controller
                    'Notice',
                    isNewModel? 'You succesfully added a new resource': 'Information succesfully changed'
                );

                cs.mediator.publish('ResourcesViewClosed'); //publish to Controller
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
            cs.mediator.publish('ResourcesViewClosed'); //publish to Controller
        },

        undoChanges: function () {
            this.model.off('change', this.preValidate);
            this.model.set(this.defaultModelJSON);
        },

        closeOnEscape: function (e) {
            if (e.which === ESC) {
                cs.mediator.publish('ResourcesViewClosed');
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
