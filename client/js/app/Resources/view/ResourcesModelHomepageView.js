(function (This) {
    This.ResourcesModelHomepageView = Backbone.View.extend({
        tagName: 'tr',
    
        template: templates.resourcesModelHomepageTpl,
    
        events: {
            'click .glyphicon-edit': 'openEdit',
            'dblclick': 'openEdit',
            'click .glyphicon-trash': 'confirmDelete'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render); 
        },
    
        openEdit: function () {
            cs.mediator.publish('EditResource', this.model);
        },

        confirmDelete: function () {
            var message = 'Are you sure to delete "' + this.model.get('name') + '" resource?';
            cs.mediator.publish('Confirm', message, this.delete.bind(this));
        },
        
        delete: function () {
            this.model.destroy();
            this.remove();
            cs.mediator.publish('Notice', 'Resource was succesfully deleted'); //publish to Messenger's Controller
        },
    
        render: function () {
            var resourceType = collections.resourceTypes.get(this.model.get('type')),
                resourceTypeName = resourceType.get('name');
            this.$el.html(this.template({
                name: this.model.get('name'),
                type: resourceTypeName,
                useInSchedule: this.model.get('useInSchedule')
            }));
            return this;
        }
    });
})(App.Resources);
