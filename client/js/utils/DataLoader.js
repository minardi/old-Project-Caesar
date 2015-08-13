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
        collections.scheduleCollection = new App.Schedule.Schedule();
        collections.eventTypes = new App.Settings.EventTypeCollection();
        collections.resourceTypes = new App.Settings.ResourceTypeCollection();
        collections.holidaysCollection = new App.Holidays.HolidaysCollection();
        collections.accountsCollection = new App.Accounts.AccountsCollection();
        collections.citiesCollection = new App.Settings.CitiesCollection();
        collections.countriesCollection = new App.Settings.CountriesCollection();
    }
    
    function renderLoadingBar () {
        $main.append(loadingTpl);
    }
    
    this.loadCollections = function (main) {
        collections.resouresCollection.fetch();
        collections.resouresCollection.once('sync', function () {
            collections.eventsCollection.fetch();
            collections.eventsCollection.once('sync', function () {
                collections.scheduleCollection.fetch();
                collections.scheduleCollection.once('sync', function () {
                    collections.eventTypes.fetch();
                    collections.eventTypes.once('sync', function () {
                        collections.resourceTypes.fetch();
                        collections.resourceTypes.once('sync', function () {
                            collections.holidaysCollection.fetch();
                            collections.holidaysCollection.once('sync', function () {
                                collections.accountsCollection.fetch();
                                collections.accountsCollection.once('sync', function () {
                                    collections.citiesCollection.fetch();
                                    collections.citiesCollection.once('sync', function () {
                                        collections.countriesCollection.fetch();
                                        collections.countriesCollection.once('sync', function () {
                                        main();
                                        $('.sequence').remove();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            })
        });
    }
};
