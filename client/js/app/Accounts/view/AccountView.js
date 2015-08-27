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
            this.defaultModelJSON = this.model.toJSON();
            this.model.on('change', function() {
                this.render();
            },this);


             this.model.on('error', function () {
                    this.model.set(this.defaultModelJSON);
            }, this);
        },
 
        render: function () {
            var locationCity = collections.citiesCollection.get(this.model.get('locationCity')),
                cityName = locationCity.get('name');

            this.$el.html(this.template({
				fullName: this.model.get('fullName'),
                login: this.model.get('login'),
                role: this.model.get('role'),
                locationCity: cityName
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
            cs.mediator.publish('Notice', 'Account was succesfully deleted');
        }
    });
})(App.Accounts);