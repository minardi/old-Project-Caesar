(function (This) {
    This.CreateEditView = Backbone.View.extend({
        className: 'modal fade in',
        template: templates.editHolidayTpl,

        events: {
            'click .save': 'save',
            'click .cancel': 'cancel'
        },

        initialize: function () {
            this.model = this.model || new This.HolidaysModel();
			Backbone.Validation.bind(this);
        },

        render: function () {
            var locationCountry = collections.countriesCollection.toJSON();
            this.$el.append(this.template({
                name: this.model.get('name'),
                locationCountry: locationCountry,
                countryId: this.model.get('locationCountry'),
                date: this.model.get('date')
            })); 
            

            setTimeout(function () {
                $("#datetimepicker").datetimepicker({
                    locale: 'ru',
                    format: 'YYYY.MM.DD'
                });
            }, 0);

            return this;
        },

        save: function () {
			if (!this.preValidate()) {
				var isNewModel = this.model.isNew(),
					attributes = {
						name : this.$('#name').val(),
						locationCountry: this.$('#selectCountry').val(),
						date: $("#date").val()
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
				
				cs.mediator.publish('HolidaysViewClosed'); //publish to Controller
			}
        },
		
		preValidate: function (e) {
              var holidayName = $('.holidayName'),
                  holidayDate =  $('.holidayDate'),
                  validationResult,
                  errors = {},

                errors = this.model.preValidate({
                    name: this.$('.holidayName').val(),
                    type: this.$('.holidayDate').val()
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
            cs.mediator.publish('HolidaysViewClosed'); //publish to Controller
        }      
    });
})(App.Holidays);
