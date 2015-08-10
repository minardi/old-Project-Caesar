(function (This) {
    This.CreateEditAccountView = Backbone.View.extend({
        template: templates.createAccountTpl,

        events: {
            'click .save': 'submit',
            'click .cancel': 'cancel'
        },

        initialize: function () {
            this.model = this.model || new This.Account();
            this.defaultModelJSON = this.model.toJSON();
            this.modelBinder = new Backbone.ModelBinder();
            Backbone.Validation.bind(this);
        },

        render: function () {
            this.$el.append(this.template(this.defaultModelJSON)); 
            this.modelBinder.bind(this.model, this.el);
            return this;
        },

        submit: function () { 
            // var $inputs = $('#formAccount :input'),
            //     attributes = {};
            // $inputs.each(function() {
            //     attributes[this.name] = $(this).val();
            // });
            var isNewModel = this.model.isNew();
            var attributes = {
                    fullName : this.$('#InputFullName').val(),
                    login: this.$('#InputLogin').val(),
                    password : this.$('#InputPassword').val(),
                    locationCity: this.$('#selectCity').val(),
                    locationCountry : this.$('#selectCountry').val(),
                    role: this.$('#selectRole').val(),

            };
            this.model.once('sync', function () {
                    if (isNewModel) {
                        cs.mediator.publish('AccountSaved', this.model);
                    } 
                    cs.mediator.publish( 'Notice',
                    isNewModel? 'You succesfully added a new account': 'Information succesfully changed');
                }, this);
            this.model.save(attributes);
           
            cs.mediator.publish('CreateAccountViewClosed'); 
        },

        cancel: function () {
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
