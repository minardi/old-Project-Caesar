(function (This) {
    This.Controller = function () {
        var resources = new This.CollectionView(),
            $resources = $('#main'),
            view;

        start();
        
        function start () {
            setUpMediator();
            $resources.append(resources.render().el);
        }

        function setUpMediator () {
            cs.mediator.subscribe('CreateResource', createView);
            cs.mediator.subscribe('ShowResources', showAll);

            //doesn't work
            cs.mediator.subscribe('EditResource', editView); //published from ResourcesModeView
            cs.mediator.subscribe('EditResourceById', editViewById);
            cs.mediator.subscribe('DeleteResourceById', deleteViewById); //published from ResourcesModeView
            cs.mediator.subscribe('ShowResourceInfo', showView);            //works now
            cs.mediator.subscribe('ShowResourceById', showViewById);
            cs.mediator.subscribe('ResourcesViewClosed', viewClosed);
        }

        function showAll () {
            view && view.remove();
            resources.show();
            resources.show();
        }

        function createView () {
            showAll();
            view && view.remove();
            view = new This.CreateEditView();

            $resources.append(view.render().el);
        }

        function editView (resource) {
            showAll();
            view.remove();
            view = new This.CreateEditView({model: resource}); //PUT doesn't work
            $resources.append(view.render().el); 
        }

        function showView (resource) {
            view && view.remove();
            view = new This.ResourcesModelView({model: resource});
            $resources.append(view.render().el);
        }

        function deleteViewById (model) {
            showAll();
            view.remove();
            model.destroy();
            // $resources.append(resources.render().el);
            // resources.getModelById(id, deleteView)
        }

        function deleteView (resource) {
            view && view.remove();
            view = new This.ResourcesModelView({model: resource});
            view.confirmDelete();
        }

        function editViewById (id) {
            //resources.getModelById(id, editView);
        }

        function viewClosed () {
            // if (reason === 'afterCreating') {
                // console.log(view);
                view.remove();
            // } else {
            //     showViewById(id);
            // }
        }

        function showViewById (id) {
            //resources.getModelById(id, showView);
         }

        function hideAll () {
            $resources.children().addClass('hidden');
        }

        return this;
    }
})(App.Resources);