(function (This) {
    This.CreateEditView = Backbone.View.extend({
		className: 'modal fade in holidayScroll',
        template: templates.editHolidayTpl,

        events: {
			'click .save': 'save',
            'click .cancel': 'cancel',
            'keypress': 'updateOnEnter',
			'keydown': 'closeOnEscape'
        },

        initialize: function () {
            this.model = this.model || new This.HolidaysModel();
			Backbone.Validation.bind(this);

            $('body').one('keypress', this.updateOnEnter.bind(this));
			$('body').one('keydown', this.closeOnEscape.bind(this));
        },

        render: function () {
            var locationCountry = collections.countriesCollection.toJSON(),
                countryName = collections.countriesCollection.get(this.model.get('locationCountry'));
				
            this.$el.append(this.template({
                name: this.model.get('name'),
                locationCountry: locationCountry,
                country: countryName,
                date: this.model.get('date')
            }));

            this.$('#datetimepicker').datetimepicker({
                locale: 'en',
                format: 'MM/DD/YYYY',
                minDate: getToday()
            });
			
            return this;
        },

        save: function () {
			var isNewModel = this.model.isNew(),
                $locationValue = this.$('#selectCountry').val()? Number(this.$('#selectCountry').val()): '',
				attributes;

            attributes = {
				name : this.$('#name').val(),
				locationCountry: $locationValue,
				date: this.$("#date").val()
			};

            if (!this.preValidate(attributes)) {
                this.model.save(attributes);
                collections.holidaysCollection.add(this.model);
                cs.mediator.publish( //publish to Messenger's Controller
                    'Notice',
                    isNewModel ? 'You succesfully added a new holiday' : 'Information succesfully changed'
                );
                this.cancel();
				$('#hollidaysModal').modal('hide');
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
            $('.myAnimateClass').removeClass('slideInDown').addClass('fadeOutUp');
			setTimeout(function() {
			    cs.mediator.publish('HolidaysViewClosed'); //publish to Controller
			}, 400); 
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
        }
    });
})(App.Holidays);
