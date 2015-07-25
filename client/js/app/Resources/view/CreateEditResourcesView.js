(function (This) {
    This.CreateEditView = Backbone.View.extend({
    tagName: 'div',

    template: editResourceTpl,

    events: {
        'click .save': 'save',
        'click .cancel': 'cancel',
    },

    initialize: function () {
        this.model = this.model || new ResourcesModel(); 
        // this.defaultModelJSON = this.model.toJSON();
        this.modelBinder = new Backbone.ModelBinder();
        // vm.mediator.subscribe('ShowResourceById', this.undoChanges, {}, this);
    },

    render: function () {
        // this.$el.append(this.template(this.model.toJSON())); 
        this.$el.append(this.template()); 

        this.modelBinder.bind(this.model, this.el);

        return this;
    },

    save: function () {
        var isNewModel = this.model.isNew();

        this.model.once('sync', function () {
            if (isNewModel) {
                vm.mediator.publish('ResourceSaved', this.model); 
            }

            vm.mediator.publish(
                'Notice',
                'success',
                isNewModel? 'You succefully added a new resource!': 'Resource has been edited!'
            );
        }, this);

        this.model.save();

         vm.mediator.publish(
            'ResourceViewClosed', 
            isNewModel? 'afterCreating': 'afterEditing',
            this.model.id
        );
    },

    cancel: function () {
        this.undoChanges();

        vm.mediator.publish(
            'ResourceViewClosed',
            isNewModel? 'afterCreating': 'afterEditing',
            this.model.id
        );
    },

    undoChanges: function () {
        this.modelBinder.unbind();
        this.model.set(this.defaultModelJSON);
    }        
    });
})(App.Resources);
