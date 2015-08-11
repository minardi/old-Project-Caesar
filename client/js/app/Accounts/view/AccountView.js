'use strict';
(function (This) {
    This.AccountView = Backbone.View.extend({
        tagName: 'tr',
        template: templates.accountTpl,

        events: {
            'click .glyphicon-edit': 'edit',
            'click .glyphicon-trash': 'confirmDelete'
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

        confirmDelete: function () {
            var message = 'Are you sure to delete "' + this.model.get('login') + '" account?';
            cs.mediator.publish('Confirm', message, this.delete.bind(this));
        },

        delete: function () {
            this.model.destroy();
            this.remove();
            cs.mediator.publish('Notice', 'Account was succesfully deleted'); //publish to Messenger's Controller
        }
    });
})(App.Accounts);