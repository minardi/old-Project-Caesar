(function (This) {
    This.HolidaysModelHomepageView = Backbone.View.extend({
        tagName: 'tr',
    
        template: holidaysModelHomepageTpl,
    
        events: {
            'click .glyphicon-edit': 'openEdit',
            'click .glyphicon-trash': 'deleteHoliday'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render); 
        },
    
        openEdit: function () {
            cs.mediator.publish('EditHoliday', this.model);
        },
        
        deleteHoliday: function () {
            this.model.destroy();
            this.remove();
        },
    
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
})(App.Holidays);
