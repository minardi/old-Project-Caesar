(function (This) {
    This.CreateEditAccountView = Backbone.View.extend({
        className: 'modal fade in accountsScroll',
        template: templates.createAccountTpl,

        events: {
            'click .cancel': 'cancel',
            'click .save': 'submit',
            'keydown': 'closeOnEscape',
            'keypress': 'updateOnEnter',
            'click .generate-pass': 'generatePassword',
            'change #InputName': 'generateLogin',
            'change #InputlastName': 'generateLogin'
        },

        initialize: function () {
            this.model = this.model || new This.Account();
            Backbone.Validation.bind(this);

            $('body').one('keypress', this.updateOnEnter.bind(this));
            $('body').one('keydown', this.closeOnEscape.bind(this));
        },

        render: function () {
            var locationCity = collections.citiesCollection.toJSON();

            this.$el.append(this.template({
                name: this.model.get('name'),
                lastName: this.model.get('lastName'),
                login: this.model.get('login'),
                password: this.model.get('password'),
                city: collections.citiesCollection.get(this.model.get('locationCity')),
                locationCity: locationCity,
                role: this.model.get('role')
            }));
        
            return this;
        },

        setAttributes: function () {
            var attributes = {},
                $city = this.$('#locationCity'),
                locationCity,
                countryId,
                $inputs;

            $inputs = this.$('.accountForm :input');

            $inputs.each(function() {
              attributes[this.name] = $(this).val();
            });

            this.model.set(attributes);
            locationCity = collections.citiesCollection.get(this.model.get('locationCity'));
            if (locationCity !== undefined) {
                countryId = locationCity.get('location');
                this.model.set('locationCountry', countryId);
            } else {
                cs.mediator.publish('Hint', "Select city", $city);
            }
            return attributes;
        },

        submit: function () { 
            var isNewModel = this.model.isNew();
            this.login = this.$('#InputLogin');

            if (!isNewModel && this.login.val() !== this.model.get('login')) {
                this.checkLogin(this.login); 
            } else {
                this.saveAccount();
            }
        },

        checkLogin: function (login) {
            if (!this.isLoginTaken(login.val())) {
                this.saveAccount();
            } else {
                this.showErrorMessage();
            }
        },

        showErrorMessage: function () {
            cs.mediator.publish('Hint','Sorry, login already exists!', this.login);
        },

        saveAccount: function () {
            var isNewModel = this.model.isNew(),
                closeView = this.cancel.bind(this),
                showError = this.showErrorMessage.bind(this),
                model = this.model;

            this.setAttributes();
            if (!this.preValidate()) {
                this.model.save({}, {
                    success: function(model, response) {
                        if (response) {
                            collections.accountsCollection.add(model);   
                            cs.mediator.publish( 'Notice',
                                isNewModel? 'You succesfully added a new account': 'Information succesfully changed');
                            closeView();     
                        } else {
                            showError();
                        }
                    },
                        wait: true
                });
           }
        },

        isLoginTaken: function (value) {
            var accounts = collections.accountsCollection.toJSON(),
                logins = [],
                result;

            accounts.forEach(function (element) {
                logins.push(element['login']);
            });
                        
            result = _.contains(logins, value); 
            return result;
        },

        preValidate: function () {
            var attrName,
                validationResult;

                validationResult = this.model.preValidate();

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
            $('.myAnimateClass').removeClass('slideInDown').addClass('fadeOutUp');
            setTimeout(function() {
                cs.mediator.publish('CreateAccountViewClosed');
            }, 400); 
        },

        show: function () {
            this.$el.removeClass('hidden');
        },
        
        hide: function () {
            this.$el.addClass('hidden');
        },

        updateOnEnter: function (e) {
            if (e.keyCode === ENTER) {
                this.saveAccount();
            }
        },

        closeOnEscape: function (e) {
            if (e.keyCode === ESC) {
               this.cancel();
            }
        },
        
        generatePassword: function () {
            var generatedPassword = Generator.getPass();
            $('.password-input').val(generatedPassword);
        },
        
        generateLogin: function () {
            var name = $('#InputName').val(),
                lastName = $('#InputlastName').val().replace('-', '').replace(' ', ''),
                generatedLogin = Generator.generateLogin(name, lastName),
                uniqueLogin = this.checkForUnique(generatedLogin);
            
            $('#InputLogin').val(uniqueLogin);
        },
        
        checkForUnique: function (_login) {
            var accountsCollection = collections.accountsCollection.toJSON(),
                login = _login;
            
            _.each(accountsCollection, function (account) {
               if (login === account.login) {
                   login = Generator.uniqualization(login);
               }
            });
            
            return login;
        }
    });
})(App.Accounts);
