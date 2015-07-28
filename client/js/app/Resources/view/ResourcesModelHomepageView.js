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
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
})(App.Resources);
