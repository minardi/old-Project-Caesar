'use strict';
(function (This) {
    This.EventView = Backbone.View.extend({
        tagName: 'tr',
		className: 'shortInfo',
        tpl: templates.eventTpl,
		
		events: {
            'click .edit': 'edit',
            'click .dell': 'confirmDelete',
            'click .fullInfo': 'showFullInfo'
        },
		
        initialize: function () {
            this.model.on('change', function() {
                this.render();
            },this);
        },

        render: function () {
            var eventType = collections.eventTypes.get(this.model.get('type')),
                eventTypeName = eventType.get('name');
            this.$el.html(this.tpl({
                name: this.model.get('name'),
                type: eventTypeName
            }));

            return this;
        },

        edit: function () {
            cs.mediator.publish('EditEvent', this.model);
        },

        confirmDelete: function () {
            var message = 'Are you sure to delete "' + this.model.get('name') + '" event?';
            cs.mediator.publish('Confirm', message, this.delete.bind(this));
        },

        delete: function () {
            this.model.destroy();
            this.remove();
            cs.mediator.publish('Notice', 'Event was succesfully deleted'); //publish to Messenger's Controller
			this.fullEveClose();
        },
		
		fullEveClose: function () {
			$('.toshow').addClass('hidden');
			$('.toshowfirst').removeClass('col-md-8');
			$('.toshowfirst').addClass('col-md-12');
			$('.shortInfo').removeClass('warning');
		},
		
		showFullInfo: function () {
		    var modelId = this.model.get('id');
		    $('.shortInfo').removeClass('warning');
		    this.$el.addClass('warning');
			$('.toshowfirst').removeClass('col-md-12');
			$('.toshowfirst').addClass('col-md-8');
			$('.fullInform').addClass('hidden');
			$('.toshow').removeClass('hidden');
			$('.ad' + modelId).removeClass('hidden');
		}
    });
})(App.Events);