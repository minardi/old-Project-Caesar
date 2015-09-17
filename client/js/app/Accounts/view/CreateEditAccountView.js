(function (This) {
    This.CreateEditAccountView = App.BaseModalView.extend({
        className: 'modal fade in accountsScroll',
        template: templates.createAccountTpl,

        events: {
            'click .cancel': 'cancel',
            'click .save': 'save',
            'keydown': 'closeOnEscape',
            'keypress': 'updateOnEnter',
            'click .generate-pass': 'generatePassword',
            'keyup': 'generateLogin',
            'change #InputLogin': 'returnName',
            'change .user-avatar': 'getUserAvatar',
            'click .returnLogin': 'returnLogin',
            'keydown': 'switch'
        },

        initialize: function () {
            this.model = this.model || new This.Account();
            Backbone.Validation.bind(this);
            this.prevLogin = '';
            
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
                role: this.model.get('role'),
                avatar: this.model.get('avatar')
            }));

			$('body').css('overflow-y', 'hidden');
            this.setPreviousLogin();
            this.setTabIndex();
            
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

        save: function () { 
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
                showError = this.showErrorMessage.bind(this),
                closeView = this.cancel.bind(this),
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
  
        cancel: function () {
            this.undoChanges();
            this.changeClassAndCancel('CreateAccountViewClosed');
            $('body').off();
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
        
        generatePassword: function () {
            var generatedPassword = Generator.getPass();
            $('.password-input').val(generatedPassword);
        },
        
        returnLogin: function () {
            var $login = this.$('#InputLogin');
            if (this.prevLogin !== '') {
                $login.val(this.prevLogin);    
            }
        },
        
        setPreviousLogin: function () {
            var $login = this.$('#InputLogin'),
                login = $login.val();
            
            if (login !== '') {
                this.prevLogin = login;
            }
        },
        
        generateLogin: function () {
            var $name = $('#InputName'),
                $lastName = $('#InputlastName'),
                name = $name.val(),
                lastName = $lastName.val().replace('-', '').replace(' ', ''),
                generatedLogin = Generator.generateLogin(name, lastName),
                uniqueLogin = this.checkForUnique(generatedLogin);
            
            if ($name.is(':focus') || $lastName.is(':focus')) {
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
                login = $login.val();
            
            if (login !== '') {
                this.prevLogin = login;
            }
        }
    });
})(App.Accounts);
