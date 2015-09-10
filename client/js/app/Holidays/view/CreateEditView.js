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

            $('body').on('keypress', this.updateOnEnter.bind(this));
			$('body').on('keydown', this.closeOnEscape.bind(this));
        },

        render: function () {
            var isNewModel = this.model.isNew(),
                holidayDate = this.model.get('date'),
                locationCountry = collections.countriesCollection.toJSON(),
                countryName = collections.countriesCollection.get(this.model.get('locationCountry'));
				
            this.$el.append(this.template({
                name: this.model.get('name'),
                locationCountry: locationCountry,
                country: countryName,
                date: holidayDate
            }));

            this.$('#datetimepicker').datetimepicker({
                locale: 'en',
                format: 'MM/DD/YYYY',
                minDate: isNewModel? getToday() : holidayDate
            });
			
			  $('body').css('overflow-y', 'hidden');
			
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
				  $('body').css('overflow-y', 'auto');
			    cs.mediator.publish('HolidaysViewClosed'); //publish to Controller
			}, 400);

            $('body').off();
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
