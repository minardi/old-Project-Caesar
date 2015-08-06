(function (This) {
    This.CreateEditView = Backbone.View.extend({
        
        className: 'modal fade in',

        template: templates.editResourceTpl,

        events: {
            'click .save': 'save',
            'click .cancel': 'cancel'
        },

        initialize: function () {
            this.model = this.model || new This.ResourcesModel(); 
            this.defaultModelJSON = this.model.toJSON();
            this.modelBinder = new Backbone.ModelBinder();
            Backbone.Validation.bind(this);
        },

        render: function () {
            var resourceTypes = collections.resourceTypes.toJSON();

            this.$el.append(this.template({resourceTypes: resourceTypes}));
            this.modelBinder.bind(this.model, this.el);

            return this;
        },

        save: function () {
            var isNewModel = this.model.isNew();

            if (!this.preValidate()) {
                this.model.once('sync', function () {
                    if (isNewModel) {
                        cs.mediator.publish('ResourceSaved', this.model); //publish to ResourcesCollectionView
                    } 

                    cs.mediator.publish( //publish to Messenger's Controller
                        'Notice',
                        isNewModel? 'You succesfully added a new resource': 'Information succesfully changed'
                    );

                }, this);

                this.model.save();
                cs.mediator.publish('ResourcesViewClosed'); //publish to Controller
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
                    type: this.model.get('type'),
                    name: this.model.get('name')
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
            this.undoChanges();
            cs.mediator.publish('ResourcesViewClosed'); //publish to Controller
        },

        undoChanges: function () {
            this.modelBinder.unbind();
            this.model.off('change', this.preValidate);
            this.model.set(this.defaultModelJSON);
        }        
    });
})(App.Resources);
