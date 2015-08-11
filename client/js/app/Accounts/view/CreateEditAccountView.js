(function (This) {
    This.CreateEditAccountView = Backbone.View.extend({
        template: templates.createAccountTpl,

        events: {
            'click .save': 'submit',
            'click .cancel': 'cancel',
            //'blur  input': 'preValidate',
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
            var isNewModel = this.model.isNew();
            //if (!this.preValidate()) {
            var attributes = {
                    fullName : this.$('#InputFullName').val(),
                    login: this.$('#InputLogin').val(),
                    password : this.$('#InputPassword').val(),
                    locationCity: this.$('#InputCity').val(),
                    locationCountry : this.$('#InputCountry').val(),
                    role: this.$('#InputRole').val(),
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
           // } 
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
                    cs.mediator.publish(   
                        'Hint',
                        errorMessage,
                        this.$('[name=' + attrName + ']')
                    ); 
                }

                validationResult = errorMessage;
            } else {
                errors = this.model.preValidate({
                    fullName: this.model.get('fullName'),
                    login: this.model.get('login'),
                    password: this.model.get('password'),
                    //locationCity: this.model.get('locationCity'),
                    //locationCountry: this.model.get('locationCountry'),
                    role: this.model.get('role')
                });

                if (errors) {
                    for (attrName in errors) {
                        cs.mediator.publish(  
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
