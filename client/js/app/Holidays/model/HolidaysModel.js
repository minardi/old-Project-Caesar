(function (This) {
    This.HolidaysModel = Backbone.Model.extend({
        defaults: function () {
        	var defaultDate = new Date();
            return {
                name: '',
                locationCountry: '',
                date: formatDate(defaultDate),
				isActive: []
            }
        },

        urlRoot: '/holidays',
		
		skipped: function () {
			var location = User.get(),
			    isActiveArr = this.get('isActive'),
				skip = true,
				elNumber;
				
				_.each(isActiveArr, function (num , i) {
				    if(location.locationCity === num) {
						elNumber = i;
				        skip = false;	   
				    }
				});
				
				return {
					skip: skip, 
					elNumber: elNumber
				}
		},
		
        validation: {
            name: [
                {
                    required: true,
                    msg: 'You forgot to choose a type'
                }
		    ]}		
    });
})(App.Holidays);