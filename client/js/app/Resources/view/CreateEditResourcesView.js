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
        this.defaultModelJSON = this.model.toJSON();
        this.modelBinder = new Backbone.ModelBinder();
    },

    render: function () {
        this.$el.append(this.template()); 
        this.modelBinder.bind(this.model, this.el);

        return this;
    },

    save: function () {
        var isNewModel = this.model.isNew();

        this.model.once('sync', function () {
            if (isNewModel) {
                cs.mediator.publish('ResourceSaved', this.model); //publish to ResourcesCollectionView
            }
        }, this);

        this.model.save();
        cs.mediator.publish('ResourcesViewClosed'); //publish to Controller
    },

    cancel: function () {
        this.undoChanges();
        cs.mediator.publish('ResourcesViewClosed'); //publish to Controller
    },

    undoChanges: function () {
        this.modelBinder.unbind();
        this.model.set(this.defaultModelJSON);
    }        
    });
})(App.Resources);
