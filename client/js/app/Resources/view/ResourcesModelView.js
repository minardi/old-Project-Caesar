(function (This) {
	This.ResourcesModelView = Backbone.View.extend({
    	tagName: 'div',
    
    	template: ResourcesModelTpl,
    
    	render: function () {
        	this.$el.append(this.template(this.model.toJSON()));
        	return this;
    	}
	});
})(App.Resources);
