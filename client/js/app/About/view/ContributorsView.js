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
				'contextmenu': 'contextMenu',
				'dblclick': 'fall'
            },

            initialize: function (options) {
                this.itaName = options.itaName;
                this.model = options.model;
				
				var cl = "a" + this.model.id
				$(this.el).addClass(cl);
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
				this.$el.addClass('mycoursor');
            },

            hideInfo: function () {
                this.view.hide();
                this.view.remove();
                this.view = undefined;
            },
			
			contextMenu: function (e) { 
                e.preventDefault();
            },
			
			fall: function () {
				var _this = this;
				this.$el.addClass('zoomOutDown');
				function second_passed1() {
				    _this.$el.removeClass('zoomOutDown').addClass('zoomInDown');
			    }
				var timeBack = Math.floor((Math.random() * 10000 / 2) + 1);
			    setTimeout(second_passed1, timeBack);
				
			}
        }
    );
})(App.About);