var DataLoader = function () {    
    collections.resouresCollection = new App.Resources.ResourcesCollection();
    collections.eventsCollection = new App.Events.EventCollection();
    
    $('#main').append(loadingTpl);
    
    collections.resouresCollection.fetch();
    collections.resouresCollection.once('sync', function () {
        collections.eventsCollection.fetch();
        collections.eventsCollection.once('sync', function () {
            main();
        })
    });
}