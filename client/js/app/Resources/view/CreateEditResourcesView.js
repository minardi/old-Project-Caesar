(function (This) {
    This.CreateEditView = Backbone.View.extend({
        
    className: 'modal fade in',


    template: editResourceTpl,

    events: {
        'click .save': 'save',
        'click .cancel': 'cancel',
    },

    initialize: function () {
        this.model = this.model || new This.ResourcesModel(); 
        console.log(this.model.toJSON());
        this.defaultModelJSON = this.model.toJSON();
        this.modelBinder = new Backbone.ModelBinder();
        // cs.mediator.subscribe('ShowResourceById', this.undoChanges, {}, this);
    },

    render: function () {
        // this.$el.append(this.template(this.model.toJSON())); 
        this.$el.append(this.template()); 
        this.modelBinder.bind(this.model, this.el);

        return this;
    },

    save: function () {
        var isNewModel = this.model.isNew();
        console.log(isNewModel);

        this.model.once('sync', function () {
            if (isNewModel) {
                cs.mediator.publish('ResourceSaved', this.model); 
            }

            // cs.mediator.publish(
            //     'Notice',
            //     'success',
            //     isNewModel? 'You succefully added a new resource!': 'Resource has been edited!'
            // );
        }, this);

        this.model.save();

        cs.mediator.publish(
            'ResourceViewClosed', 
            isNewModel? 'afterCreating': 'afterEditing',
            this.model.id
        );
    },

    cancel: function () {
        this.undoChanges();

        cs.mediator.publish(
            'ResourcesViewClosed',
            this.model.isNew()? 'afterCreating': 'afterEditing',
            this.model.id
        );
    },

    undoChanges: function () {
        this.modelBinder.unbind();
        this.model.set(this.defaultModelJSON);
    }        
    });
})(App.Resources);
