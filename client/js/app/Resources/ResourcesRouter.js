'use strict';
(function (This) {
	This.Router = Backbone.Router.extend({
		routes: {
			'Resources': 'showResources',
			'Resources/new': 'createResource',
			'Resources/:id': 'getResource',
			'Resources/:id/edit': 'editResource',
			'Resources*path': 'notFound'
		},

		initialize: function () {
			var controller = new App.Resources.Controller();

			cs.mediator.subscribe('ShowResources', this.navigateResources, null, this);
            cs.mediator.subscribe('ShowResourceInfo', this.navigateShowResource, null, this);
            cs.mediator.subscribe('ShowResourceById', this.navigateShowResourceById, null, this);
            cs.mediator.subscribe('CreateResource', this.navigateNewResource, null, this);
            cs.mediator.subscribe('EditResource', this.navigateEditResource, null, this);
            cs.mediator.subscribe('EditResourceById', this.navigateEditResourceById, null, this);
            cs.mediator.subscribe('ResourcesViewClosed', this.navigateResources, null, this);
            
            Backbone.history.loadUrl(Backbone.history.fragment);
		},

		navigateResources: function () {
            this.navigate('Resources');
        },

        navigateShowResource: function (event) {
            this.navigate('Resources/' + event.id);
        },

        navigateShowResourceById: function (id) {
            this.navigate('Resources/' + id);
        },

        navigateNewResource: function () {
            this.navigate('Resources/new');
        },

        navigateEditResource: function (event) {
            this.navigate('Resources/' + event.id + '/edit');
        },

        navigateEditResourceById: function (id) {
            this.navigate('Resources/' + id + '/edit');
        },

        showResources: function () {
            cs.mediator.publish('ShowResources');
        },
        getResource: function () {
            cs.mediator.publish('ShowResources');
        },

        createResource: function () {
            cs.mediator.publish('CreateResource');
        },

        editResource: function (id) {
            cs.mediator.publish('EditResourceById', id);
        },

        getResource: function (id) {
            cs.mediator.publish('ShowResourceById', id);
        },

        notFound: function () {
            cs.mediator.publish('Show404View');
        }
	});
})(App.Resources);