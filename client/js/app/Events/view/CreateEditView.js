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

            if (!this.preValidate()) {
                if (this.isNewModel) {
                    this.model.once('sync', function () {
                        cs.mediator.publish('EventSaved', this.model);
                    }, this);
                }

                cs.mediator.publish( //publish to Messenger's Controller
                    'Notice',
                    this.isNewModel? 'You succesfully added a new event': 'Information succesfully changed'
                );

                this.model.save();
                cs.mediator.publish('CreateEditViewClosed');
            }
        },

        preValidate: function (e) {
            var attrName,
                errorMessage,
                validationResult,
                errors = {};

            if (e) {
                attrName = e.target.name;
                errorMessage = this.model.preValidate(attrName, this.model.get(attrName));

                if (errorMessage) {
                    cs.mediator.publish(   //publish to Messenger's Controller
                        'Hint',
                        errorMessage,
                        this.$('[name=' + attrName + ']')
                    ); 
                }

                validationResult = errorMessage;
            } else {
                errors = this.model.preValidate({
                    name: this.model.get('name'),
                    type: this.model.get('type')
                });

                if (errors) {
                    for (attrName in errors) {
                        cs.mediator.publish(   //publish to Messenger's Controller
                            'Hint',
                            errors[attrName],
                            this.$('[name=' + attrName + ']')
                        ); 
                    }
                }
                validationResult = errors;
            }

            return validationResult;
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