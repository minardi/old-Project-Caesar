(function (This) {
	This.ResourcesModelView = Backbone.View.extend({
    	className: 'modal fade in',
    
    	template: resourcesModelTpl,
        
        events: {
            'click .closeModel': 'close'    
        },
        
    	render: function () {
        	this.$el.append(this.template(this.model.toJSON()));
        	return this;
    	},
        
        close: function () {
            //cs.mediator.publish('ShowResources');
        }
	});
})(App.Resources);
