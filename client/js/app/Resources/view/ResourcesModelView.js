(function (This) {
	This.ResourcesModelView = Backbone.View.extend({
    	className: 'modal fade in',
    
    	template: resourcesModelTpl,
        
        events: {
            'click .cancel': 'close',
            'click .delete': 'delete',
            'click .edit': 'edit'
        },
        
    	render: function () {
        	this.$el.append(this.template(this.model.toJSON()));
        	return this;
    	},
        
        close: function () {
            cs.mediator.publish('ResourcesViewClosed');
        },

        delete: function () {
            cs.mediator.publish('DeleteResourceById', this.model);
        },

        edit: function () {
            cs.mediator.publish('EditResource', this.model);
        }
	});
})(App.Resources);
