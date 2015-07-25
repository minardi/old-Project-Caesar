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

        }

        function setUpMediator () {

            cs.mediator.subscribe('Collection loaded', renderList);

            cs.mediator.subscribe('ShowEvents', showAll);
            cs.mediator.subscribe('ShowEventInfo', showView);
            cs.mediator.subscribe('ShowEventById', showViewById);

            cs.mediator.subscribe('CreateEvent', createView);
            cs.mediator.subscribe('EditEvent', editView);
            cs.mediator.subscribe('EditEvent', editViewById);
            cs.mediator.subscribe('DeleteEventById', deleteViewById);

            cs.mediator.subscribe('EventViewClosed', viewClosed);
			
			 cs.mediator.subscribe('AddEvent', addEvent);
        }

        function renderList () {
            hideAll();
            $events.append((events.render().el));
        }
		
		function addEvent () {
            view && view.remove();
        }
		
        function showAll () {
            $events.html((events.render().el));
        }

        function createView () {
            //hideAll();
            view && view.remove();
            view = new This.CreateEditView({collection: collection});

          //  events.hide();
            $events.append(view.render().el);
        }

        function editView (event) {
           // hideAll();
            view && view.remove();
            view = new This.CreateEditView({model: event});

           // events.hide();
            $events.append(view.render().el);
        }

        function showView (event) {
            hideAll();
            view && view.remove();
            view = new This.EventHomepageView({model: event});

            events.hide();
            $events.append(view.render().el);
        }

        function editViewById (id) {
          //  events.getModelById(id, editView);
        }

        function viewClosed (reason, id) {
           /* if (reason === 'afterCreating') {
                cs.mediator.publish('ShowEvents');
            } else {
                cs.mediator.publish('ShowEventById', id);
            }*/
			view && view.remove();
            $('.panel').addClass('hidden');
        }

        function showViewById (id) {
            events.getModelById(id, showView);
        }

        function hideAll () {
            $events.children().addClass('hidden');
        }

         function deleteViewById (model) {
			$( ".event-list" ).remove();
			$( ".removeadd" ).remove();
			view && view.remove();
            collection.remove(model);
			$events.append((events.render().el));
        }

        function deleteView (event) {
            //view && view.remove();
           // view = new This.EventHomepageView({model: event});
            //view.confirmDelete();
        }

        return this;
    }
})(App.Events);