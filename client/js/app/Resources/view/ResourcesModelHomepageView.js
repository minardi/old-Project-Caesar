(function (This) {
    This.ResourcesModelHomepageView = Backbone.View.extend({
        tagName: 'tr',
    
        template: resourcesModelHomepageTpl,
    
        events: {
            'click': 'mediatorPublish'
        },
    
        mediatorPublish: function () {
            cs.mediator.publish('ShowResourceInfo', this.model);    
        },
    
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
})(App.Resources);
