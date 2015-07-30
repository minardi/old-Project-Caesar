var DataLoader = function () {
    var $main = $('#main');
    start();
    
    function start () {
        initCollections();
        renderLoadingBar();
    }
    
    function initCollections () {
        collections.resouresCollection = new App.Resources.ResourcesCollection();
        collections.eventsCollection = new App.Events.EventCollection();
    }
    
    function renderLoadingBar () {
        $main.append(loadingTpl);
    }
    
    this.loadCollections = function (main) {
        collections.resouresCollection.fetch();
        collections.resouresCollection.once('sync', function () {
            collections.eventsCollection.fetch();
            collections.eventsCollection.once('sync', function () {
                main();
                $('.sequence').remove();
            })
        });
    }
}