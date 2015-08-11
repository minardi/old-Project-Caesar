(function (This) {
    This.CreateEditView = Backbone.View.extend({
        
        className: 'modal fade in',

        template: templates.editHolidayTpl,

        events: {
            'click .save': 'save',
            'click .cancel': 'cancel',
            'keypress':	'updateOnEnter'
        },

        initialize: function () {
            this.model = this.model || new This.HolidaysModel(); 
            this.defaultModelJSON = this.model.toJSON();
            this.modelBinder = new Backbone.ModelBinder();
            $('body').on('keydown', this.closeOnEscape);
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

            this.model.set({date: $("#date").val()});

            this.model.save(); 
            
            cs.mediator.publish('HolidaysViewClosed'); //publish to Controller
        },

        cancel: function () {
            this.undoChanges();
            cs.mediator.publish('HolidaysViewClosed'); //publish to Controller
        },

        undoChanges: function () {
            this.modelBinder.unbind();
            this.model.set(this.defaultModelJSON);
        },

        updateOnEnter: function (e) {
            if (e.keyCode === ENTER) {
                this.save();
            }
        },

        closeOnEscape: function (e) {
            if (e.which === ESC) {
                cs.mediator.publish('HolidaysViewClosed');
            }
        }
    });
})(App.Holidays);
