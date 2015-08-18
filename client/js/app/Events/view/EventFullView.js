'use strict';
(function (This) {
    This.EventFullView = Backbone.View.extend({
        tagName: 'tbody',
		className: 'fullInform',
        tpl: templates.eventFullTpl,
		
        initialize: function () {
			 this.resourceCollection = collections.resouresCollection;
			
            this.model.on('change', function() {
                this.render();
				
            },this);
        },

        render: function () {
			var resources = this.model.get('resources');
			
			var res = "";
	        _.each(resources, function (num) {
				this.resourceCollection.each(function (event) {
	                if(num === event.get('id')) {
						res += "<tr><td>" + event.get('name') + '</td></tr>';
					}
                });  
			}, this);		
			
			 var eventType = collections.eventTypes.get(this.model.get('type')),
                eventTypeName = eventType.get('name'),
				id = this.model.get('id');
			this.$el.addClass('ad' + id);
			
            this.$el.html(this.tpl({
                name: this.model.get('name'),
                type: eventTypeName,
				resourc: res
            }));
			$('.shortInfo').removeClass('warning');
			$('.toshow').addClass('hidden');
			$('.toshowfirst').removeClass('col-md-8');
			$('.toshowfirst').addClass('col-md-12');
			$('.fullInform').addClass('hidden');
            $('.ad' + id).removeClass('hidden');
			
            return this;
        }


    });
})(App.Events);