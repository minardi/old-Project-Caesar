(function (This) {
    This.CreateEditAccountView = Backbone.View.extend({
        template: templates.createAccountTpl,

        events: {
            'click .save': 'saveAccount',
            'keydown': 'closeOnEscape',
            'keypress':	'updateOnEnter'
        },

        initialize: function () {
            this.model = this.model || new This.Account();
            Backbone.Validation.bind(this);

            $('body').one('keypress', this.updateOnEnter.bind(this));
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
			
			this.$('#accountModal').modal('show');
			
			this.$('#accountModal').on('hidden.bs.modal', function (e) {	
                    cs.mediator.publish('CreateAccountViewClosed', 'ShowAccounts');
				})

            return this;
        },

        saveAccount: function () {
            var isNewModel = this.model.isNew(),
                $login = this.$('#InputLogin'),
                model = this.model,
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
                    this.model.save(attributes, {
                        success: function() {
                            $('#accountModal').modal('hide');
                            collections.accountsCollection.add(model);   
                            cs.mediator.publish( 'Notice',
                                isNewModel? 'You succesfully added a new account': 'Information succesfully changed');
                        }, 

                        error: function (model, err) {
                            cs.mediator.publish('Hint', err.responseText, $login);
                        },
                        wait: true
                });          
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
