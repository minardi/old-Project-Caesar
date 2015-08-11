(function (This) {
    This.Controller = function () {
        var collection = collections.resouresCollection,
            resources = new This.CollectionView({collection: collection}),
            $resources = $('#main'),
            view,
            api;

        api = {
            showAll: showAll,
            createView: createView,
            editViewById: editViewById

        };

        start();
        
        function start () {
            setUpMediator();
            $resources.append(resources.render().el);
        }

        function setUpMediator () {
            cs.mediator.subscribe('CreateResource', createView); //published from CollectionView 
            cs.mediator.subscribe('EditResource', editView); //published from ResourcesModeView
            cs.mediator.subscribe('ResourcesViewClosed', viewClosed); //published from CreateEditView
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
            view && view.remove();
            view = new This.CreateEditView({model: resource}); 
            $resources.append(view.render().el); 
        }
        
        function editViewById (id) {
            resources.getModelById(id, editView);
        }

        function viewClosed () {
            view.remove();
        }

        function hideAll () {
            $resources.children().addClass('hidden');
        }

        return api;
    }
})(App.Resources);