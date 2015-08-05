(function (This) {
    This.ResourcesModelHomepageView = Backbone.View.extend({
        tagName: 'tr',
    
        template: resourcesModelHomepageTpl,
    
        events: {
            'click .glyphicon-edit': 'openEdit',
            'click .glyphicon-trash': 'deleteResource'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render); 
        },
    
        openEdit: function () {
            cs.mediator.publish('EditResource', this.model);
        },
        
        deleteResource: function () {
            this.model.destroy();
            this.remove();
        },
    
        render: function () {
            var resourceType = collections.resourceTypes.get(this.model.get('type')),
                resourceTypeName = resourceType.get('name');
            this.$el.html(this.template({
                name: this.model.get('name'),
                type: resourceTypeName
            }));
            return this;
        }
    });
})(App.Resources);
