(function (This) {
    This.Controller = function () {
        var startDate = new Date(collections.weeks.toJSON()[0].startDate),
            monthView = new App.MonthView(),
            $main = $('#main');
        
        start();
        
        function start () {
            $('#main').append(monthView.render(startDate).el);
            startDate.setMonth(startDate.getMonth() + 1);
            $('#main').append(monthView.render(startDate).el);
            startDate.setMonth(startDate.getMonth() + 1);
            $('#main').append(monthView.render(startDate).el);
            
            findFirstWeek(); // add class 'start' to every first week
        }
            
        function findFirstWeek () {
            monthView.findFirstWeek();
        }
    }
})(App);