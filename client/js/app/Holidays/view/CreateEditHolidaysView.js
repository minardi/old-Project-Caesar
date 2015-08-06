(function (This) {
    This.CreateEditView = Backbone.View.extend({
        
        className: 'modal fade in',

        template: editHolidayTpl,

        events: {
            'click .save': 'save',
            'click .cancel': 'cancel',
        },

        initialize: function () {
            this.model = this.model || new This.HolidaysModel(); 
            this.defaultModelJSON = this.model.toJSON();
            this.modelBinder = new Backbone.ModelBinder();
        },

        render: function () {
            this.$el.append(this.template()); 
            this.modelBinder.bind(this.model, this.el);

            setTimeout(function () {
                $("#datetimepicker").datetimepicker({
                    locale: 'ru',
                    format: 'DD.MM.YYYY'
                });
            }, 0);

            return this;
        },

        save: function () {
            var isNewModel = this.model.isNew();

            this.model.once('sync', function () {
                if (isNewModel) {
                    cs.mediator.publish('HolidaySaved', this.model); //publish to HolidaysCollectionView
                } 

                cs.mediator.publish( //publish to Messenger's Controller
                    'Notice',
                    isNewModel? 'You succesfully added a new holiday': 'Information succesfully changed'
                );

            }, this);

            // this.model.save(); //temporary measures - uncomment this when server layer exists
            
            cs.mediator.publish('HolidaysViewClosed'); //publish to Controller
        },

        cancel: function () {
            this.undoChanges();
            cs.mediator.publish('HolidaysViewClosed'); //publish to Controller
        },

        undoChanges: function () {
            this.modelBinder.unbind();
            this.model.set(this.defaultModelJSON);
        }        
    });
})(App.Holidays);
