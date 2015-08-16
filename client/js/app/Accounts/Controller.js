(function (This) {
        This.Controller = Backbone.Controller.extend({
            subscribes: {
                'CreateAccount': 'createView',
                'EditAccount': 'editView',
                'CreateAccountViewClosed': 'viewClosed'
            },

            initialize: function () {
                this.collectionView = new This.AccountCollectionView();
                this.createEditView = This.CreateEditAccountView;
                this.el = $('#main');
                this.mediator = cs.mediator;
            }
        });
})(App.Accounts);