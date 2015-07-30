(function (This) {
    This.ResourcesModel = Backbone.Model.extend({
        defaults: function () {
            return {
                'type': '',
                'name': ''
            }
        },

        urlRoot: '/resources',

        validation: {
        	type: [
        		{
        			required: true,
        			msg: 'Field cannot be empty'
        		}
        	],
        	name: [
        		{
        			required: true,
        			msg: 'Field cannot be empty'
        		}
        	]
        }
    });
})(App.Resources);