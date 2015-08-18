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
            var locationCity =  collections.citiesCollection.toJSON();

            this.$el.append(this.template({
                fullName: this.model.get('fullName'),
                login: this.model.get('login'),
                password: this.model.get('password'),
                city: collections.citiesCollection.get(this.model.get('locationCity')),
                locationCity: locationCity,
                role: this.model.get('role')
            })); 
            return this;
        },


        submit: function () { 
            var isNewModel = this.model.isNew();

            if(!isNewModel) {
                $('#InputLogin').val() !== this.model.get('login')? this.checkLogin(): this.saveAccount();
            } else {
                this.checkLogin();
            }
        },

        checkLogin: function () {
            if (!this.isLoginTaken($('#InputLogin').val())) {
                this.saveAccount();
            } else {
                cs.mediator.publish('Hint', 'This login already exists', $('#InputLogin'));
            }
        },

        saveAccount: function () {
            var isNewModel = this.model.isNew(),
                attributes = {},
                locationCity,
                countryId,
                $inputs;

            $inputs = $('.accountForm :input');                  
            $inputs.each(function() {
              attributes[this.name] = $(this).val();
            });

            this.model.set(attributes);
            locationCity = collections.citiesCollection.get(this.model.get('locationCity'));
            countryId = locationCity.get('location');
            this.model.set('locationCountry', countryId);
                
            if (!this.preValidate()) {
                this.model.save(attributes);
                collections.accountsCollection.add(this.model);   
                cs.mediator.publish( 'Notice',
                    isNewModel? 'You succesfully added a new account': 'Information succesfully changed');
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

        isLoginTaken: function (value) {
            var msg = '',
                accounts = collections.accountsCollection.toJSON(),
                logins = [],
                result;
            accounts.forEach(function (element) {
                logins.push(element['login']);
            });
                        
            result = _.contains(logins, value); 
            return result;
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
