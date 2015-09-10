(function (This) {
    This.ResourcesModel = Backbone.Model.extend({
        defaults: function () {
            return {
                'type': '',
                'name': '',
                'locationCity': '',
                'locationCountry': '',
				'dateStart': '01/01/2015',
				'dateFinish': '01/02/2015',
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
			dateFinish: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }
            ],
            dateStart: function (value) {
                if (value !== '') { 
                    var msg = '',
                        dateStart = toDateObj(value),
                        dateFinish = toDateObj($('#dateFinish').val());            
                    if (dateFinish <= dateStart) {
                        msg = '\'Start date\' should be earlier than \'End date\'';
                        return msg;
                    }
                } else {
                      msg = 'Field cannot be empty';
                      return msg;
                }
            }
        }
    });
})(App.Resources);