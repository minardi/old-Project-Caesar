'use strict';

(function (This) {
    This.Controller = function () {
        var collection = new This.EventCollection(),
            events = new This.EventCollectionView({collection: collection}),
            resourceCollection = new App.Resources.ResourcesCollection(),
            $events = $('#main'),
            view;

        resourceCollection.fetch();

        start();

        function start () {
            setUpMediator();

            $events.append((events.render().el));

        }

        function setUpMediator () {

            cs.mediator.subscribe('ShowEvents', showAll);
            cs.mediator.subscribe('CreateEvent', createView);
            cs.mediator.subscribe('EditEvent', editView);

            cs.mediator.subscribe('EditEventById', editEventById);

            cs.mediator.subscribe('CreateEditViewClosed', viewClosed);
            cs.mediator.subscribe('EventSaved', addToCollection);
        }

        function addToCollection (model) {
            collection.add(model);
        }
		
        function showAll () {
            hideAll();
            view && view.remove();
            events.show();
        }

        function createView () {
            view && view.remove();
            view = new This.CreateEditView({
                collection: collection,
                resourceCollection: resourceCollection
            });
            $events.append(view.render().el);
        }

        function editView (event) {
            view && view.remove();
            view = new This.CreateEditView({
                model: event,
                resourceCollection: resourceCollection
            });
            $events.append(view.render().el);
        }

        function editEventById (id) {
            events.getModelById(id, editView);
        }


        function viewClosed () {
			view && view.remove();
            cs.mediator.publish('RouteToEvents', showAll);
        }

        function hideAll () {
            $events.children().addClass('hidden');
        }


        return this;
    }
})(App.Events);