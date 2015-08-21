(function (This) {
	This.PreView = Backbone.View.extend ({
		template: templates.preViewScheduleTpl,
 		
		events: {
			'click .save': 'save'
		},
		
		initialize: function () {
            var _this = this;			
			this.$el = $('body');
			
			$(document).keypress(function(e) {
				if (e.keyCode === ENTER) {
				    _this.save();
			    }
		    });
		},
		
		render: function () {
		    var _this = this;
		    this.$el.append(this.template());
		    this.$('.bs-example-modal-lg').modal('toggle');
		    this.$('.bs-example-modal-lg').on('hidden.bs.modal', function (e) {
  			    $('.bs-example-modal-lg').remove();
			})
			
			this.$('.save').click(function () {
				_this.save();  
			});
			
		},
		
		save: function () {
			var a = this.$('.editName').val();
			console.log(a);
			$('.bs-example-modal-lg').modal('hide');
		}
	})
})(App.Schedule);