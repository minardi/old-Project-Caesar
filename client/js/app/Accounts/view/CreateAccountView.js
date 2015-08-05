(function (This) {
    This.CreateAccountView = Backbone.View.extend({
        template: createAccountTpl,
        className: 'accounts',

        events: {
            'click .save': 'submit'
        },

        initialize: function () {
            this.model = this.model || new This.Account(); 
            this.defaultModelJSON = this.model.toJSON();
            this.modelBinder = new Backbone.ModelBinder();
            Backbone.Validation.bind(this);
        },

        render: function () {
            this.$el.append(this.template(this.defaultModelJSON )); 
            this.modelBinder.bind(this.model, this.el);

            return this;
        },

        submit: function () { 
            var $inputs = $('#formAccount :input');
            var attributes = {};
            $inputs.each(function() {
                attributes[this.name] = $(this).val();
            });
            
            this.model.save(attributes);

                // cs.mediator.publish( //publish to Messenger's Controller
                //     'Notice',
                //     'You succesfully added a new account');
        },

        show: function () {
            this.$el.removeClass('hidden');
        },
        hide: function () {
            this.$el.addClass('hidden');
        }  
    });
})(App.Accounts);
