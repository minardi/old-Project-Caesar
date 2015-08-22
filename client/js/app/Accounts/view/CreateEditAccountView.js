(function (This) {
    This.CreateEditAccountView = Backbone.View.extend({
		className: 'modal fade in accountsScroll',
        template: templates.createAccountTpl,

        events: {
			'click .cancel': 'cancel',
            'click .save': 'saveAccount',
            'keydown': 'closeOnEscape',
            'keypress':	'updateOnEnter'
        },

        initialize: function () {
            this.model = this.model || new This.Account();
            Backbone.Validation.bind(this);

            $('body').one('keypress', this.updateOnEnter.bind(this));
			$('body').one('keydown', this.closeOnEscape.bind(this));
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
                            collections.accountsCollection.add(model);   
                            cs.mediator.publish( 'Notice',
                                isNewModel? 'You succesfully added a new account': 'Information succesfully changed');
							this.cancel();	
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
  
        cancel: function () {
			$('.myAnimateClass').removeClass('slideInDown').addClass('slideOutDown');
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
        }
    });
})(App.Accounts);
