(function (This) {
    This.MonthView = Backbone.View.extend({
        tagName: 'div',
        className: 'modal-calendar',
        
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
                date = new Date(year, month);

            this.$el.append(this.template({date: date, mon: month, monthNames: this.monthNames}));
            this.$el.append(this.template({date: date, mon: month + 1, monthNames: this.monthNames}));
            this.$el.append(this.template({date: date, mon: month + 2, monthNames: this.monthNames}));

            return this;
        },
    
        renderPreview: function (e) {
            var startDate = $(e.target).parent().attr('class').split(' ')[1],
                previewWeek = this.getWeek(startDate);
            
            cs.mediator.publish('ShowWeek', previewWeek);
        },
        
        getWeek: function (startDate) {
            var previewWeek = {};
            
            App.SchedulePreview.weeks.forEach(function (week) {        //weeks collection
                var weekStartDate = new Date(week.startDate).getDate();
                
                if (weekStartDate == startDate) {
                    previewWeek = week;
                }
            });
            
            return previewWeek;
        }
    });
})(App);