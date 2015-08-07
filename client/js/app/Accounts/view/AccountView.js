'use strict';
(function (This) {
    This.AccountView = Backbone.View.extend({
        template: accountTpl,

        events: {
            'click .edit': 'edit',
            'click .dell': 'delete'
        },

         initialize: function () {
            this.listenTo(this.model, 'change', this.render); 
        },
 
        render: function () {
            this.$el.html(this.template({
                login: this.model.get('login'),
                role: this.model.get('role'),
                locationCity: this.model.get('locationCity')
             }));

            return this;
        },

        edit: function () {
            cs.mediator.publish('EditAccount', this.model);
        },

        delete: function () {
            this.model.destroy();
            this.remove();
        }
    });
})(App.Accounts);