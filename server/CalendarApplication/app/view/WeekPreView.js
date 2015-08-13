var WeekPreView = Backbone.View.extend({
    template: templates.weekPreviewTpl,
    
    events: {
        'click td': 'renderWeek'    
    },
    
    render: function (weekId) {
        var eventsId = this.getEventsId(),
            resourcesId = this.getResourcesId(eventsId),
            weekRersources = this.getResourcesById(resourcesId);
        
        this.currentWeekId = weekId;

        this.$el.append(this.template({resources: weekRersources}));
        
        return this;
    },
    
    renderWeek: function (e) {
        var resourceId = e.target.className,
            weekView = new App.WeekView();
        
        $('#main').html(weekView.render(resourceId, this.currentWeekId).el);
    },
    
    getEventsId: function () {
        var eventsId = [];
        
        _.each(this.model.days, function (days) {
            _.each(days, function (eventId) {
                _.each(eventId, function (id) {
                    eventsId.push(id);
                });
            });
        });
        
        return eventsId;
    },
    
    getResourcesId: function (eventsId) {
        var events = collections.events.toJSON(),
            resourcesId = [];
        
        _.each(events, function (event) {
            _.each(eventsId, function (id) {
                if (id === event.id) {
                    resourcesId.push(event.resources);
                }
            });
        });
        
        resourcesId = _.flatten(resourcesId);
        resourcesId = _.unique(resourcesId);
        
        return resourcesId;
    },
    
    getResourcesById: function (resourcesId) {
        var resourcesCollection = collections.resources.toJSON(),
            weekResources = [];
        
        _.each(resourcesCollection, function (resource) {
            _.each(resourcesId, function (id) {
                if (id === resource.id) {
                    weekResources.push(resource);
                }
            });
        });
        
        return weekResources;
    }
});