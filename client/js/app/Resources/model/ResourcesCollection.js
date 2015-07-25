var ResourcesCollection = Backbone.Collection.extend({
    model: ResourcesModel,
    url: '/resources',
    
    comparator: function (resource) {
        return resource.get('type');
    }
});