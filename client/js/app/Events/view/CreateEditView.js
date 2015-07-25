/**
 * Created by Acer on 24.07.2015.
 */
(function (This) {
    This.CreateEditView = Backbone.View.extend({
        tagName: 'div',

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

            if(this.isNewModel) {
                var id = 0;
                this.collection.each(function(model){

                    var a = model.get('id');
                    if(id <= a) {
                        id = a+1;
                    }
                });
                this.model.set({id:id});
                this.collection.add(this.model);
            }
           //this.model.save();
            cs.mediator.publish('AddEvent', this.model);
        },

        cancel: function () {

            if(this.isNewModel) {
                this.model.destroy();
                this.collection.remove(this.model);
            }

            this.undoChanges();
            cs.mediator.publish('EventViewClosed');
        },

        undoChanges: function () {
            this.modelBinder.unbind();
            //this.model.off('change', this.preValidate);
            this.model.set(this.defaultModelJSON);
        }

    });
})(App.Events);