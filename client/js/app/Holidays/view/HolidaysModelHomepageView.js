(function (This) {
    This.HolidaysModelHomepageView = Backbone.View.extend({
        tagName: 'tr',
    
        template: templates.holidaysModelHomepageTpl,
    
        events: {
            'click .glyphicon-edit': 'openEdit',
            'click .glyphicon-trash': 'confirmDelete',
            'click .isActive': 'isActive'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render); 
        },
    
        openEdit: function () {
            cs.mediator.publish('EditHoliday', this.model);
        },
        
        confirmDelete: function () {
            var message = 'Are you sure to delete ' + this.model.get('name') + ' holiday?';
            cs.mediator.publish('Confirm', message, this.delete.bind(this));
        },

        delete: function () {
            this.model.destroy();
            this.remove();
            cs.mediator.publish('Notice', 'Holiday was succesfully deleted'); //publish to Messenger's Controller
        },
		
		isActive: function () {
			var isActiveClass = this.$('.isActive');
			
			if(this.model.get('isActive')) {
				this.model.set('isActive', false);
				this.$('.isActive').removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
			} else {
				this.model.set('isActive', true);
			}
			this.model.save(); 
		},
    
        render: function () {
            var locationCountry = collections.countriesCollection.get(this.model.get('locationCountry')),
                countryName = locationCountry.get('name');

            this.$el.html(this.template({
                name: this.model.get('name'),
                locationCountry: countryName,
                date: this.model.get('date')
            }));
			
			if(!this.model.get('isActive')) {
				this.$('.isActive').removeClass('glyphicon-eye-open').addClass('glyphicon glyphicon-eye-close');
			}
			
            return this;
        }
    });
})(App.Holidays);
