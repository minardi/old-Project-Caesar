(function (This) {
    This.ResourcesModelHomepageView = Backbone.View.extend({
        tagName: 'tr',
    
        template: resourcesModelTpl,
    
        events: {
            'click': 'mediatorPublish'
        },
    
        mediatorPublish: function () {
            mediator.publish('resourceSelected', this.model);    
        },
    
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
})(App.Resources);
