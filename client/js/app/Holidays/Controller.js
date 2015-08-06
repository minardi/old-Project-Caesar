(function (This) {
    This.Controller = function () {
        // var collection = collections.holidaysCollection,
        var collection = new App.Holidays.HolidaysCollection([
                {
                    name: 'Labor Day',
                    location: 'Ukraine',
                    date: '01.05.2015'
                },
                {
                    name: 'Independence Day',
                    location: 'Ukraine',
                    date: '24.08.2015'
                }
            ]),
            holidays = new This.CollectionView({collection: collection}),
            $holidays = $('#main'),
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
            $holidays.append(holidays.render().el);
        }

        function setUpMediator () {
            cs.mediator.subscribe('CreateHoliday', createView); //published from CollectionView 
            cs.mediator.subscribe('EditHoliday', editView); //published from HolidaysModeView
            cs.mediator.subscribe('HolidaysViewClosed', viewClosed); //published from CreateEditView
        }

        function showAll () {
            hideAll();
            view && view.remove();
            holidays.show();
        }

        function createView () {
            view && view.remove();
            view = new This.CreateEditView();
            $holidays.append(view.render().el);
        }

        function editView (holiday) {
            view && view.remove();
            view = new This.CreateEditView({model: holiday}); 
            $holidays.append(view.render().el); 
        }
        
        function editViewById (id) {
            holidays.getModelById(id, editView);
        }

        function viewClosed () {
            view.remove();
        }

        function hideAll () {
            $holidays.children().addClass('hidden');
        }

        return api;
    }
})(App.Holidays);