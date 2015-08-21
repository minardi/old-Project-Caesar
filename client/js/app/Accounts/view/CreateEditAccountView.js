(function (This) {
    This.CreateEditAccountView = Backbone.View.extend({
        template: templates.createAccountTpl,

        events: {
            'keypress':	'updateOnEnter'
        },

        initialize: function () {
            this.model = this.model || new This.Account();
            Backbone.Validation.bind(this);

            $('body').one('keypress', this.updateOnEnter.bind(this));
        },

        render: function () {
            var locationCity =  collections.citiesCollection.toJSON(),
			    _this = this;

            this.$el.append(this.template({
                fullName: this.model.get('fullName'),
                login: this.model.get('login'),
                password: this.model.get('password'),
                city: collections.citiesCollection.get(this.model.get('locationCity')),
                locationCity: locationCity,
                role: this.model.get('role')
            }));
			
			this.$('#accountModal').modal('show');			
			
			this.$('#save').click(function () {
			     _this.submit();		
			});
			
			this.$('#accountModal').on('hidden.bs.modal', function (e) {	
                    cs.mediator.publish('CreateAccountViewClosed', 'ShowAccounts');
				})

            return this;
        },


        submit: function () { 
            var isNewModel = this.model.isNew();

            if(!isNewModel) {
                this.$('#InputLogin').val() !== this.model.get('login')? this.checkLogin(): this.saveAccount();
            } else {
                this.checkLogin();
            }
        },

        checkLogin: function () {
            var $login = this.$('#InputLogin');

            if (!this.isLoginTaken($login .val())) {
                this.saveAccount();
            } else {
                cs.mediator.publish('Hint', 'This login already exists', $login);
            }
        },

        saveAccount: function () {
            var isNewModel = this.model.isNew(),
                attributes = {},
                locationCity,
                countryId,
                $inputs;

            $inputs = this.$('.accountForm :input');                  
            $inputs.each(function() {
              attributes[this.name] = $(this).val();
            });
            this.model.set(attributes);
            if (!this.preValidate()) {
                locationCity = collections.citiesCollection.get(this.model.get('locationCity'));
                countryId = locationCity.get('location');
                this.model.set('locationCountry', countryId);
                this.model.save(attributes);
				
				$('#accountModal').modal('hide');
				
                collections.accountsCollection.add(this.model);   
                cs.mediator.publish( 'Notice',
                    isNewModel? 'You succesfully added a new account': 'Information succesfully changed');
                
            } 
        },

        preValidate: function () {
            var attrName,
                validationResult;

                validationResult = this.model.preValidate({
                    fullName: this.model.get('fullName'),
                    login: this.model.get('login'),
                    password: this.model.get('password'),
                    locationCity: this.model.get('locationCity')

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
        }
    });
})(App.Accounts);
