(function (This) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'CreateResource': 'createView',                      //published from CollectionView
            'EditResource': 'editView',                          //published from ResourcesModeView
            'ResourcesViewClosed': 'viewClosed',                 //published from CreateEditView
            'ShowResourceUsage': 'ShowResourceUsage',            //from ResourceModelHomepageiew
            'EventsForEditViewClosed': 'EventsForEditViewClose', //from ResourcesModelHomepageView
            'EditEventClicked': 'showEditEvent'                  //from EventItemView
        },

        initialize: function () {
            this.collection = collections.resouresCollection;
            this.collectionView = new This.CollectionView();
            this.createEditView = This.CreateEditView;
            this.el = $('#main');
            this.mediator = cs.mediator;
        },

        //method for rendering list of events, with resource that user wont to delete
        ShowResourceUsage: function (filteredCollection) {
            this.EventsForEditView = new App.Resources.EventsForEditView({collection: filteredCollection});
            this.el.append(this.EventsForEditView.render().$el);
        },

        EventsForEditViewClose: function () {
            this.EventsForEditView && this.EventsForEditView.remove();
        },

        showEditEvent: function (event) {
            this.editEventView = new App.Events.CreateEditView({model: event});
            this.EventsForEditView.remove();
            this.el.append(this.editEventView.render().$el);
        }
    });
})(App.Resources);