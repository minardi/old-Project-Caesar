(function (This) {
    This.HolidaysModelHomepageView = Backbone.View.extend({
        tagName: 'tr',
    
        template: templates.holidaysModelHomepageTpl,
    
        events: {
            'click .glyphicon-edit': 'openEdit',
            'click .glyphicon-trash': 'confirmDelete'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render); 
        },
    
        openEdit: function () {
            cs.mediator.publish('EditHoliday', this.model);
        },

        confirmDelete: function () {
            var message = 'Are you sure to delete ' + this.model.get('name') + ' holiday?';
            cs.mediator.publish('Confirm', message, this.delete.bind(this));
        },
        
        delete: function () {
            this.model.destroy();
            this.remove();
            cs.mediator.publish('Notice', 'Holiday was succesfully deleted'); //publish to Messenger's Controller
        },
    
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
})(App.Holidays);
