'use strict';
(function (This) {
    This.SettingsView = Backbone.View.extend({
        tagName: 'div',
        className: 'settings',
        
        initialize: function () {
            this.eventsView = new App.Settings.EventTypeCollectionView();
            this.resourcesView = new App.Settings.ResourceTypeCollectionView();
        },
        
        render: function () {
            this.$el.append(this.resourcesView.render().$el);
            this.$el.append(this.eventsView.render().$el);

            return this;
        },

        show: function () {
            this.$el.removeClass('hidden');
        }
    });
})(App.Settings);