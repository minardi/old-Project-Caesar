(function (This) {
    This.ResourcesModel = Backbone.Model.extend({
        defaults: function () {
            return {
                'type': '',
                'name': '',
                'locationCity': '',
                'locationCountry': '',
				'dateStart': '',
				'dateFinish': '',
                'useInSchedule': true
            }
        },

        urlRoot: '/resources',

        validation: {
            type: [
                {
                    required: true,
                    msg: 'You forgot to choose a type'
                }
            ],
			
            name: [
                {
                    maxLength: 18,
                    msg: 'Max length is 18 symbols'
                },
                {
                    minLength: 2,
                    msg: 'Min length is 2 symbols'
                },
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }
            ],
			
			dateStart: function(attrs) {
				if(!attrs.match(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/)) {
				  return 'Something wrong with this date'
				}
		    },	
			
			dateFinish: function(attrs) {		
				if(!attrs.match(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/)) {
				  return 'Something wrong with this date'
				}
			}	
        }
    });
})(App.Resources);