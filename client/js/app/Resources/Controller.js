(function (This) {
    This.Controller = Backbone.Controller.extend({
        initialize: function () {
            this.collectionView = new This.CollectionView();
            this.createEditView = This.CreateEditView;
            this.el = $('#main');
            this.mediator = cs.mediator;
        },

        subscribes: {
            'CreateResource': 'createView',      //published from CollectionView
            'EditResource': 'editView',          //published from ResourcesModeView
            'ResourcesViewClosed': 'viewClosed'  //published from CreateEditView
        }
    });
})(App.Resources);