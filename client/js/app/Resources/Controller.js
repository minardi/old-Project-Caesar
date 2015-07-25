(function (This) {
    This.Controller = function () {
        var resources = new This.CollectionView(),
            $resources = $('#main'),
            view;

        start();
        
        function start () {
            setUpMediator();
        }

        function setUpMediator () {
            cs.mediator.subscribe('CreateResource', createView);
            cs.mediator.subscribe('ShowResources', showAll);

            //doesn't work
            cs.mediator.subscribe('EditResource', editView);
            cs.mediator.subscribe('EditResourceById', editViewById);
            cs.mediator.subscribe('DeleteResourceById', deleteViewById);
            cs.mediator.subscribe('ShowResourceInfo', showView);            //works now
            cs.mediator.subscribe('ShowResourceById', showViewById);
            cs.mediator.subscribe('ResourcesViewClosed', viewClosed);
        }

        function showAll () {
            hideAll();
            view && view.remove();

            $resources.append(resources.render().el);
        }

        function createView () {
            hideAll();
            view && view.remove();
            view = new This.CreateEditView();

            $resources.append(view.render().el);
        }

        function editView (resource) {
            hideAll();
            view && view.remove();
            view = new This.CreateEditView({model: resource});
            $resources.append(view.render().el);
        }

        function showView (resource) {
            hideAll();
            view && view.remove();
            view = new This.ResourcesModelView({model: resource});
            $resources.append(view.render().el);
        }

        function deleteViewById(id) {
            resources.getModelById(id, deleteView)
        }

        function deleteView (resource) {
            view && view.remove();
            view = new This.ResourcesModelView({model: resource});
            view.confirmDelete();
        }

        function editViewById (id) {
            //resources.getModelById(id, editView);
        }

        function viewClosed (reason, id) {
            if (reason === 'afterCreating') {
                showAll();
            } else {
                showViewById(id);
            }
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