(function (This) {
    This.ResourcesModelHomepageView = Backbone.View.extend({
        tagName: 'tr',
    
        template: resourcesModelHomepageTpl,
    
        events: {
            'click .glyphicon-edit': 'openEdit',
            'click .glyphicon-trash': 'deleteResource'
        },
    
        openEdit: function () {
            cs.mediator.publish('EditResource', this.model);
        },
        
        deleteResource: function () {
            cs.mediator.publish('DeleteResourceById', this.model);
        },
    
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
})(App.Resources);
