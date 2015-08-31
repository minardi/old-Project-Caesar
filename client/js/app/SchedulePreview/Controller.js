(function (This) {
        This.Controller = function () {
        App.SchedulePreview.weeks = setUpWeeksCollection();
            
        var startDate = new Date(),
            monthView = new App.MonthView();
        
        start();
        
        function start () {
            setUpMediator();
            //renderCalendar();
            setTimeout(function () {
                renderCalendar();    
            }, 0);
        }
            
        function setUpWeeksCollection () {
            var currentMonth = new Date().getMonth(),
                weeksCollection = [];
            _.each(collections.scheduleCollection.toJSON(), function (week) {
                var month = new Date(week.startDate).getMonth();
                if (month === currentMonth || month === currentMonth + 1 || month === currentMonth + 2) {
                    weeksCollection.push(week);
                }
            });
            
            return weeksCollection;
        }
            
        function renderCalendar () {            
            $('.schedule-preview').append(monthView.render(startDate).el);
        }
        
        function setUpMediator () {
            cs.mediator.subscribe('ShowCalendar', showCalendar, {}, this);
            cs.mediator.subscribe('ShowWeek', showWeek, {}, this);
            cs.mediator.subscribe('ShowWeekById', showWeekById, {}, this);
            cs.mediator.subscribe('ShowSchedule', showSchedule, {}, this);
            cs.mediator.subscribe('ShowScheduleById', showScheduleById, {}, this);
        }
        
        function showCalendar () {
            $('.modal-calendar').removeClass('hiden');
            $('.modal-preview').remove();
            $('.modal-schedule').remove();
        }
        
        function showWeek (previewWeek) {
            hideAll();
            var weekPreView = new WeekPreView({model: previewWeek});
            
            $('.schedule-preview').append(weekPreView.render(previewWeek.id).el);
        }
        
        function showWeekById (id) {
            getWeekById(id, showWeek);
        }
        
        function showSchedule (resourceId, weekId) {
            hideAll();
            var weekView = new App.WeekView();
            
            $('.schedule-preview').append(weekView.render(resourceId, weekId).el);
        }
        
        function showScheduleById (weekId, resourceId) {
            showSchedule(resourceId, weekId);
        }
        
        function hideAll () {
            $('.schedule-preview').children().addClass('hiden');
        }
        
        function getWeekById (id, callback) {
            var weeks = App.SchedulePreview.weeks; //weeks collection
            _.each(weeks, function (week) {
                if (week.id == id) {
                    callback(week);
                }    
            }, this);

        }
    };
})(App.SchedulePreview);