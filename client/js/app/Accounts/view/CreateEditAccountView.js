(function (This) {
    This.CreateEditAccountView = Backbone.View.extend({
        template: templates.createAccountTpl,

        events: {
            'click .save': 'submit',
            'click .cancel': 'cancel',
            'keypress':	'updateOnEnter'
        },

        initialize: function () {
            this.model = this.model || new This.Account();
            Backbone.Validation.bind(this);

            $('body').on('keydown', this.closeOnEscape);
        },

        render: function () {
            var locationCity =  collections.citiesCollection.toJSON(),
                locationCountry = collections.countriesCollection.toJSON();

            this.$el.append(this.template({
                fullName: this.model.get('fullName'),
                login: this.model.get('login'),
                password: this.model.get('password'),
                locationCity: locationCity,
                locationCountry: locationCountry,
                role: this.model.get('role'),

            })); 
            return this;
        },

        submit: function () { 
            var isNewModel = this.model.isNew(),
                attributes = {},
                $inputs;

            $inputs = $('.clearfix :input');                  
            $inputs.each(function() {
              attributes[this.name] = $(this).val();
            });
            this.model.set(attributes);
            if (!this.preValidate()) {
                this.model.once('sync', function () {
                    if (isNewModel) {
                        cs.mediator.publish('AccountSaved', this.model);
                    } 
                cs.mediator.publish( 'Notice',
                    isNewModel? 'You succesfully added a new account': 'Information succesfully changed');
                }, this);
                this.model.save();
                cs.mediator.publish('CreateAccountViewClosed');
            } 
        },

        preValidate: function () {
            var attrName,
                validationResult;

                validationResult = this.model.preValidate({
                    fullName: this.model.get('fullName'),
                    login: this.model.get('login'),
                    password: this.model.get('password'),
                });

                if (validationResult) {
                    for (attrName in validationResult) {
                        cs.mediator.publish(  
                            'Hint',
                            validationResult[attrName],
                            this.$('[name=' + attrName + ']')
                        );
                    }
                }
            return validationResult;
        }, 

        cancel: function () {
            cs.mediator.publish('CreateAccountViewClosed');
        },

        show: function () {
            this.$el.removeClass('hidden');
        },
        hide: function () {
            this.$el.addClass('hidden');
        },

        updateOnEnter: function (e) {
            if (e.keyCode === ENTER) {
                this.submit();
            }
        },

        closeOnEscape: function (e) {
            if (e.which === ESC) {
                cs.mediator.publish('CreateAccountViewClosed');
            }
        }
    });
})(App.Accounts);
