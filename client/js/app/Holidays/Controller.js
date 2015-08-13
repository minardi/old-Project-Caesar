(function (This) {
        This.Controller = Backbone.Controller.extend({
            subscribes: {
                'CreateHoliday': 'createView',            //published from CollectionView
                'EditHoliday': 'editView',                //published from HolidaysModeView
                'HolidaysViewClosed': 'viewClosed'    //published from CreateEditView
            },

            initialize: function () {
                this.collectionView = new This.CollectionView({collection: collections.holidaysCollection});
                this.createEditView = This.CreateEditView;
                this.el = $('#main');
                this.mediator = cs.mediator;
            }
        });
})(App.Holidays);