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
            cs.mediator.subscribe('EditResource', editView); //published from ResourcesModeView
            cs.mediator.subscribe('EditResourceById', editViewById);
            cs.mediator.subscribe('DeleteResourceById', deleteViewById);
            cs.mediator.subscribe('ShowResourceById', showViewById);
            cs.mediator.subscribe('ResourcesViewClosed', viewClosed);
        }

        function showAll () {
            hideAll();
            view && view.remove();
            resources.show();
        }

        function createView () {
            view && view.remove();
            view = new This.CreateEditView();
            $resources.append(view.render().el);
        }

        function editView (resource) {
            showAll();
            view && view.remove();
            view = new This.CreateEditView({model: resource}); 
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

        function viewClosed () {
                view.remove();
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