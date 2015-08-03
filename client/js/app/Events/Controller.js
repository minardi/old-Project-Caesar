'use strict';

(function (This) {
    This.Controller = function () {
        var collection = collections.eventsCollection,
            events = new This.EventCollectionView({collection: collection}),
            resourceCollection = collections.resouresCollection,
            $events = $('#main'),
            view;

        return{
            start : start,
            showAll: showAll,
            createView: createView,
            editEventById: editEventById

        };

        function start () {
            setUpMediator();
            $events.append((events.render().el));
        }

        function setUpMediator () {
            cs.mediator.subscribe('CreateEvent', createView);
            cs.mediator.subscribe('EditEvent', editView);
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
            cs.mediator.publish('RouteToEvents');
        }

        function hideAll () {
            $events.children().addClass('hidden');
        }

    }
})(App.Events);