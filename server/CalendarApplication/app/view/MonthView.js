(function (This) {
    This.MonthView = Backbone.View.extend({
        template: templates.monthTpl,
        
        events: {
            'click .days': 'renderPreview'    
        },
        
        initialize: function () {
            this.monthNames = [
                'January', 'February', 'March', 
                'April', 'May', 'June', 
                'July', 'August', 'September', 
                'October', 'November', 'December'
            ];
        },
        
        render: function (_startDate) {
            var elem = this.el,
                startDate = _startDate,
                year = startDate.getFullYear(),
                month = startDate.getMonth(),
                date = new Date(year, month),
                monthName = '';

            this.monthNames.forEach(function (mName, num) {
                if (num === month) {
                    monthName = mName;
                }
            });

            this.$el.append(this.template({date: date, mon: month, monthName: monthName}));

            return this;
        },
        
        findFirstWeek: function () {
            $('tr').each(function () {
                var $td = $(this).find('td').eq(0); 
                if ($td.html() === '') {
                    $(this).addClass('start');
                }                        
            }, this);
        },
    
        renderPreview: function (e) {
            var startDate = $(e.target).parent().attr('class').split(' ')[1],
                previewWeek = this.getWeek(startDate),
                weekPreView = new WeekPreView({model: previewWeek});
            
            $('#main').html(weekPreView.render(previewWeek.id).el);
        },
        
        getWeek: function (startDate) {
            var previewWeek = {};
            
            scheduleCollection.forEach(function (week) {
                var weekStartDate = new Date(week.startDate).getDate();
                if (weekStartDate == startDate) {
                    previewWeek = week;
                }
            });
            
            return previewWeek;
        }
    });
})(App);