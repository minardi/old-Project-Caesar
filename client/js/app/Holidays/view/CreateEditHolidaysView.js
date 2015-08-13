(function (This) {
    This.CreateEditView = Backbone.View.extend({
        className: 'modal fade in',
        template: templates.editHolidayTpl,

        events: {
            'click .save': 'save',
            'click .cancel': 'cancel',
        },

        initialize: function () {
            this.model = this.model || new This.HolidaysModel(); 
        },

        render: function () {
            var locationCountry = collections.countriesCollection.toJSON();
            this.$el.append(this.template({
                name: this.model.get('name'),
                locationCountry: locationCountry,
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
            var isNewModel = this.model.isNew(),
                attributes = {
                    name : this.$('#name').val(),
                    locationCountry: this.$('#selectCountry').val(),
                    date: $("#date").val(),
					isActive: true
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
        },

        cancel: function () {
            cs.mediator.publish('HolidaysViewClosed'); //publish to Controller
        }      
    });
})(App.Holidays);
