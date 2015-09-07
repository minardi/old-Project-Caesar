(function (This) {
    This.UserSettingsView = Backbone.View.extend({
        template: templates.userSettingsTpl,
        
        events: {
            'click #save': 'submit',
            'click .generate-pass': 'generatePassword'
        },
        
        initialize: function () {
            this.model = new App.Accounts.Account(User.get());
        },
        
        render: function () {
            this.$el.append(this.template({
                name: this.model.get('name'),
                lastName: this.model.get('lastName'),
                login: this.model.get('login'),
                password: this.model.get('password')
            }));
        
            return this;
        },
        
        submit: function () {
            var newModel = this.setAttributes();
            
            this.model.save(newModel, {
                success: function() {
                    cs.mediator.publish( 'Notice', 'You succesfully change account');
                },
                wait: true
            });

        },
        
        setAttributes: function () {
            var attributes = {},
                $inputs;
                
            $inputs = this.$('.accountForm :input');

            $inputs.each(function() {
              attributes[this.name] = $(this).val();
            });

            return attributes;
        },
        
        show: function () {
            this.$el.removeClass('hidden');
        },
        
        generatePassword: function () {
            var generatedPassword = Generator.getPass();
            $('.password-input').val(generatedPassword);
        },
    });
})(App.UserSetting);
