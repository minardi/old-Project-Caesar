"use strict";

(function (This) {
    This.ContributorCollection = Backbone.Collection.extend({

        url: '/about/Contributors',

        model: This.Contributor

    });

})(App.About);