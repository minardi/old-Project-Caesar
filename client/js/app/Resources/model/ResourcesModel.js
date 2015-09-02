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
                    msg: 'Select type'
                }
            ],
			
            name: [
                {
                    maxLength: 20,
                    msg: 'Max length is 20 symbols'
                },
                {
                    minLength: 2,
                    msg: 'Min length is 2 symbols'
                },
                {
                    required: true,
                    msg: 'Field cannot be empty'
                },
                {
                    pattern: 'resourceNameRegEx',
                    msg: 'Latin alphabet only. Allowed symbols: .-/'
                }
            ],
			
			dateStart: function(attrs) {
				if(!attrs.match(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/)) {
				  return 'This date isn’t correct';
				}
		    },	
			
			dateFinish: function(attrs) {		
				if(!attrs.match(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/)) {
				  return 'This date isn’t correct';
				}
			}	
        }
    });
})(App.Resources);