(function (This) {
    This.CreateEditView = Backbone.View.extend({
        className: 'modal fade in',
        template: editEventTpl,

        events: {
            'click .save': 'save',
            'click .cancel': 'cancel'
        },

        initialize: function () {
            this.model = this.model || new This.Event();
            this.defaultModelJSON = this.model.toJSON();
            this.modelBinder = new Backbone.ModelBinder();

            Backbone.Validation.bind(this);

        },

        render: function () {
            this.$el.append(this.template());

            this.modelBinder.bind(this.model, this.el);

            return this;
        },


        save: function () {
            this.isNewModel = this.model.isNew();
            if (this.isNewModel) {

                this.model.once('sync', function () {
                    cs.mediator.publish('EventSaved', this.model);
                }, this);
            }
                this.model.save();
                cs.mediator.publish('CreateEditViewClosed');


        },

        cancel: function () {
            if (this.isNewModel) {
                this.model.destroy();
                this.collection.remove(this.model);
            }

            this.undoChanges();
            cs.mediator.publish('CreateEditViewClosed');
        },

        undoChanges: function () {
            this.modelBinder.unbind();
            this.model.set(this.defaultModelJSON);
        }

    });
})(App.Events);