(function (This) {
    This.CreateEditView = Backbone.View.extend({
        template: templates.editHolidayTpl,

        events: {
            'keydown': 'closeOnEscape',
            'keypress': 'updateOnEnter'
        },

        initialize: function () {
            this.model = this.model || new This.HolidaysModel();
			Backbone.Validation.bind(this);

            $('body').one('keydown', this.closeOnEscape.bind(this));
            $('body').one('keypress', this.updateOnEnter.bind(this));
        },

        render: function () {
            var locationCountry = collections.countriesCollection.toJSON(),
                countryName = collections.countriesCollection.get(this.model.get('locationCountry')),
				_this = this;
				
            this.$el.append(this.template({
                name: this.model.get('name'),
                locationCountry: locationCountry,
                country: countryName,
                date: this.model.get('date')
            }));

            this.$('#datetimepicker').datetimepicker({
                locale: 'ru',
                format: 'YYYY.MM.DD'
            });
			
			this.$('#hollidaysModal').modal('show');			
			
     		this.$('#save').click(function () {
			    _this.save();		
			});
			
            return this;
        },

        save: function () {
			if (!this.preValidate()) {
				var isNewModel = this.model.isNew(),
					attributes = {
						name : this.$('#name').val(),
						locationCountry: this.$('#selectCountry').val(),
						date: this.$("#date").val()
				};        
				this.model.once('sync', function () {
					if (isNewModel) {
						cs.mediator.publish('HolidaySaved', this.model); //publish to HolidaysCollectionView
					} 
					cs.mediator.publish( //publish to Messenger's Controller
						'Notice',
						isNewModel? 'You succesfully added a new holiday': 'Information succesfully changed'
					);
				}, this);
				
				this.model.save(attributes); 

				$('#hollidaysModal').modal('hide');
				
				this.$('#hollidaysModal').on('hidden.bs.modal', function (e) {//////////////////////////////////////
				    cs.mediator.publish('HolidaysViewClosed'); //publish to Controller
				    cs.mediator.publish('HolidayCreated', 'all'); //publish to HolidaysCollectionView
				});

				cs.mediator.publish('HolidaysViewClosed'); //publish to Controller
				//cs.mediator.publish('HolidayCreated', 'all'); //publish to HolidaysCollectionView
			}
        },
		
		preValidate: function (e) {
              var holidayName = $('.holidayName'),
                  holidayDate =  $('.holidayDate'),
                  validationResult,
                  errors = {},

                errors = this.model.preValidate({
                    name: this.$('.holidayName').val(),
                    date: this.$('.holidayDate').val()
                });
				
                holidayName.parent().removeClass('has-error');
                holidayDate.parent().removeClass('has-error');

                $('.tooltip-arrow').removeClass('myTooltip');
                $('.tooltip-inner').removeClass('myTooltipInner');

                remove ();

                function remove () {
                    holidayName.tooltip('destroy');
                    holidayDate.tooltip('destroy');
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
                        holidayName.parent().addClass('has-error');
                        toolTip(holidayName);
                    }
                    if (errors.type) {
                        holidayDate.parent().addClass('has-error');
                        toolTip(holidayDate);
                    }
                }
                validationResult = errors;

            return validationResult;
        },

        cancel: function () {
            $('#hollidaysModal').on('hidden.bs.modal', function (e) {
                cs.mediator.publish('HolidaysViewClosed'); //publish to Controller
			})
		},

        closeOnEscape: function (e) {
            if (e.which === ESC) {
                this.cancel();
            }
        },

        updateOnEnter: function (e) {
            if (e.keyCode === ENTER) {
                this.save();
            }
        }
    });
})(App.Holidays);
