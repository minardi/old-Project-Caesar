(function (This) {
    This.CreateAccountView = Backbone.View.extend({
        template: createAccountTpl,

        events: {
            'click #submit': 'submit'
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
            var attributes = {
                name : this.$('.name').val(),
                type: this.$('.surname').val(),
                name : this.$('.email').val(),
                type: this.$('.username').val(),
                };

            if (!this.preValidate()) {
            this.model.save(attributes);

                cs.mediator.publish( //publish to Messenger's Controller
                    'Notice',
                    'You succesfully added a new account');

                cs.mediator.publish('CreateAccountViewClosed');
            }
        },

        preValidate: function (e) {
            var attrName,
                errorMessage,
                validationResult,
                errors = {};

            if (e) {
                attrName = e.target.name;
                errorMessage = this.model.preValidate(attrName, this.model.get(attrName));

                if (errorMessage) {
                    cs.mediator.publish(   //publish to Messenger's Controller
                        'Hint',
                        errorMessage,
                        this.$('[name=' + attrName + ']')
                    ); 
                }

                validationResult = errorMessage;
            } else {
                errors = this.model.preValidate({
                    type: this.model.get('surname'),
                    name: this.model.get('name'),
                    email: this.model.get('email'),
                    username: this.model.get('username')
                });

                if (errors) {
                    for (attrName in errors) {
                        cs.mediator.publish(   //publish to Messenger's Controller
                            'Hint',
                            errors[attrName],
                            this.$('[name=' + attrName + ']')
                        ); 
                    }
                }
                validationResult = errors;
            }

            return validationResult;
        },

        show: function () {
            this.$el.removeClass('hidden');
        },
        hide: function () {
            this.$el.addClass('hidden');
        }  
    });
})(App.Accounts);
