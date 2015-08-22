(function (This) {
	This.PreView = Backbone.View.extend ({
		className: 'modal fade in preViewScroll',
		template: templates.preViewScheduleTpl,
 		
		events: {
			'click .save': 'save',
			'click .cancel': 'cancel',
			'keydown': 'closeOnEscape',
            'keypress': 'updateOnEnter'
		},
		
		initialize: function () {
			$('body').one('keydown', this.closeOnEscape.bind(this));
            $('body').one('keypress', this.updateOnEnter.bind(this));
		},
		
		render: function () {
		    this.$el.append(this.template());
			return this;
		},
		
		save: function () {
			var a = this.$('.editName').val();
			console.log(a);
			this.cancel()
		},
		
		cancel: function () {
            var _this = this;			
			$('.myAnimateClass').removeClass('slideInDown').addClass('slideOutDown');
			setTimeout(function() {
				_this.el.remove();
		    	cs.mediator.publish('PreViewClose');
			}, 400); 
        },
		
		closeOnEscape: function (e) {
            if (e.keyCode === ESC) {
                this.cancel();
            }
        },
		
		updateOnEnter: function (e) {
            if (e.keyCode === ENTER) {
                this.save();
            }
        }
	})
})(App.Schedule);