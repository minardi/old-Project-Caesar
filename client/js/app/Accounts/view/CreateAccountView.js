(function (This) {
    This.CreateAccountView = Backbone.View.extend({
        template: createAccountTpl,

        events: {
            'click .save': 'submit',
            'click .back': 'close'
        },

        initialize: function () {
            this.model = this.model || new This.Account(); 
            this.model.once('sync', function () {
                cs.mediator.publish('AccountSaved', this.model);
            }, this);
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
            // var $inputs = $('#formAccount :input'),
            //     attributes = {};
            // $inputs.each(function() {
            //     attributes[this.name] = $(this).val();
            // });
            
            var attributes = {
                    fullName : this.$('#InputFullName').val(),
                    login: this.$('#InputLogin').val(),
                    password : this.$('#InputPassword').val(),
                    locationCity: this.$('#selectCity').val(),
                    locationCountry : this.$('#selectCountry').val(),
                    role: this.$('#selectRole').val(),

            };
                   
            this.model.save(attributes);

            cs.mediator.publish( 
                    'Notice',
                    'You succesfully added a new account');

            cs.mediator.publish('CreateAccountViewClosed'); 
        },

        close: function () {
            this.modelBinder.unbind();
            cs.mediator.publish('CreateAccountViewClosed');
        },

        show: function () {
            this.$el.removeClass('hidden');
        },
        hide: function () {
            this.$el.addClass('hidden');
        }  
    });
})(App.Accounts);
