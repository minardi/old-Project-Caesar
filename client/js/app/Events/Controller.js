'use strict';

(function (This) {
    This.Controller = function () {
        var collection = new This.EventCollection(),
            events = new This.EventCollectionView({collection: collection}),
            $events = $('#main'),
            view;

        start();

        function start () {
            setUpMediator();

            $events.append((events.render().el));

        }

        function setUpMediator () {

            cs.mediator.subscribe('ShowEvents', showAll);

            cs.mediator.subscribe('CreateEvent', createView);
            cs.mediator.subscribe('EditEvent', editView);

            cs.mediator.subscribe('CreateEditViewClosed', viewClosed);
            cs.mediator.subscribe('EventSaved', renderList);
        }

        function renderList (model) {
            collection.add(model);
        }
		
        function showAll () {
            hideAll();
            view && view.remove();
            events.show();
        }

        function createView () {
            view && view.remove();
            view = new This.CreateEditView({collection: collection});
            $events.append(view.render().el);
        }

        function editView (event) {
            view && view.remove();
            view = new This.CreateEditView({model: event});
            $events.append(view.render().el);
        }


        function viewClosed () {
			view && view.remove();
        }

        function hideAll () {
            $events.children().addClass('hidden');
        }


        return this;
    }
})(App.Events);