(function (This) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'CreateResource': 'createView',      //published from CollectionView
            'EditResource': 'editView',          //published from ResourcesModeView
            'ResourcesViewClosed': 'viewClosed'  //published from CreateEditView
        },

        initialize: function () {
            this.collection = collections.resouresCollection;
            this.collectionView = new This.CollectionView();
            this.createEditView = This.CreateEditView;
            this.el = $('#main');
            this.mediator = cs.mediator;
        }
    });
})(App.Resources);