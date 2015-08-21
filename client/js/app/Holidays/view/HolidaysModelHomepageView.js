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
            this.user = User.get();			
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
			var skip = this.model.skipped(),
                location = User.get();
			
			var isActiveClass = this.model.get('isActive');

			if(!skip.skip) {
				isActiveClass.splice(skip.elNumber, 1);
				this.$el.removeClass("warning");
				this.$('.isActive').removeClass('glyphicon-thumbs-down').addClass('glyphicon-thumbs-up');
			} else {
				isActiveClass.push(location.locationCity);
				this.model.set('isActive', isActiveClass);
				this.$el.addClass("warning");
				this.$('.isActive').removeClass('glyphicon-thumbs-up').addClass('glyphicon-thumbs-down');
			}
			
			this.model.save(); 
		},
    
        render: function () {
            console.dir(this.model.get('locationCountry'));
            var locationCountry = collections.countriesCollection.get(this.model.get('locationCountry')),
                countryName = locationCountry.get('countryName'),
				skip = this.model.skipped();

            this.$el.html(this.template({
                name: this.model.get('name'),
                locationCountry: countryName,
                date: this.model.get('date'),
				role: this.user.role
            }));
			
			if(!skip.skip) {
				this.$('.isActive').removeClass('glyphicon-thumbs-up').addClass('glyphicon-thumbs-down');
				this.$el.addClass("warning");
			}
			
            return this;
        }
    });
})(App.Holidays);
