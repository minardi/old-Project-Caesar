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
            'keyup': 'generateLogin',
            'change #InputLogin': 'returnName',
            'change .user-avatar': 'getUserAvatar'
        },

        initialize: function () {
            this.model = this.model || new This.Account();
            Backbone.Validation.bind(this);

            $('body').on('keypress', this.updateOnEnter.bind(this));
            $('body').on('keydown', this.closeOnEscape.bind(this));
        },

        render: function () {
            var locationCity = collections.citiesCollection.toJSON();

            this.$el.empty().append(this.template({
                name: this.model.get('name'),
                lastName: this.model.get('lastName'),
                login: this.model.get('login'),
                password: this.model.get('password'),
                city: collections.citiesCollection.get(this.model.get('locationCity')),
                locationCity: locationCity,
                role: this.model.get('role')
            }));

            this.$('.preview').attr('src', this.model.get('avatar'));
			$('body').css('overflow-y', 'hidden');
            this.setPreviousLogin();
            
            return this;
        },

        getAttributes: function () {
            var attributes = {},
                $inputs;
                
            $inputs = this.$('.accountForm :input');

            $inputs.each(function() {
              attributes[this.name] = $(this).val();
            });

            return attributes;
        },

        getUserAvatar: function (evt) {
            var that = this,
                reader,
                file;

            reader = new FileReader();
            file = evt.target.files;

            reader.onload = function () {
                that.model.set({avatar: reader.result});
                that.$('.preview').attr('src', reader.result);
                that.model.set({'avatar': reader.result});
            };
            reader.readAsDataURL(file[0]);
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
                closeView = this.changeClassAndCansel.bind(this),
                showError = this.showErrorMessage.bind(this),
                attributes = this.getAttributes();

            if (!this.preValidate(attributes)) {
                this.model.save(attributes, {
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
				$('body').css('overflow-y', 'auto');
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

        preValidate: function (attributes) {
            var attrName,
                validationResult;

                validationResult = this.model.preValidate(attributes);

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
            this.undoChanges();
            this.changeClassAndCansel();
            $('body').off();
        },

        changeClassAndCansel: function () {
            $('.myAnimateClass').removeClass('slideInDown').addClass('fadeOutUp');
			$('body').css('overflow-y', 'auto');
            setTimeout(function() {
                cs.mediator.publish('CreateAccountViewClosed');
            }, 400); 
        },

        undoChanges: function () {
            this.model.off('change', this.preValidate);
            this.model.previousAttributes();
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
            if (e.keyCode === ESC) {
               this.cancel();
            }
        },
        
        generatePassword: function () {
            var generatedPassword = Generator.getPass();
            $('.password-input').val(generatedPassword);
        },
        
        setPreviousLogin: function () {
            var $login = this.$('#InputLogin'),
                login = this.$('#InputLogin').val();
            
            if (login !== '') {
                this.prevLogin = login;
                this.$('.returnLogin').on('click', function () {
                    $login.val(login);
                });
            }
        },
        
        generateLogin: function () {
            var name = $('#InputName').val(),
                lastName = $('#InputlastName').val().replace('-', '').replace(' ', ''),
                generatedLogin = Generator.generateLogin(name, lastName),
                uniqueLogin = this.checkForUnique(generatedLogin);
            
            if ($('#InputName').is(':focus') || $('#InputlastName').is(':focus')) {
                $('#InputLogin').val(uniqueLogin);    
            }
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
        },
        
        returnName: function () {
            var $login = $('#InputLogin'),
                login = $login.val(),
                $returnLogin = $('.returnLogin');
            
            if (login !== '') {
                $returnLogin.off();
                $returnLogin.on('click', function () {
                    $login.val(login);
                });
            }
        }
    });
})(App.Accounts);
