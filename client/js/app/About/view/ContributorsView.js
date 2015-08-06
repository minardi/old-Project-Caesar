"use strict";

(function (This) {
    This.ContributorsView = Backbone.View.extend({
            tagName: 'div',
            className: 'contributors-names-container animated swing',
            view: '',
		    itaName: '',

            template: templates.contributorNamesTpl,
            events: {
                'mouseover': 'showInfo',
                'mouseout': 'hideInfo',
				'contextmenu': 'contextMenu'
            },

            initialize: function (options) {
                this.itaName = options.itaName;
                this.model = options.model;
            },

            render: function () {
                this.$el.html(this.template(this.model));

                return this;
            },

            showInfo: function () {
                if (!this.view) {
                    this.view = new This.ContributorsInfoView({model: this.model});

                    $('.list-group-container').append(this.view.render(this.itaName).el);
                }
            },

            hideInfo: function () {
                this.view.hide();
                this.view.remove();
                this.view = undefined;
            },
			
			contextMenu: function (e) { 
                e.preventDefault();
            }
        }
    );
})(App.About);