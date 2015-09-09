(function (This) {
    This.UserSettingsView = Backbone.View.extend({
		className: 'modal fade in eventsScroll',
        template: templates.userSettingsTpl,
        
        events: {
            'click #save': 'submit',
			'click .cancel': 'cancel',
            'click .generate-pass': 'generatePassword',
			'keydown': 'closeOnEscape',
			'keypress': 'updateOnEnter',
            'change .user-avatar': 'getUserAvatar'
        },
        
        initialize: function () {
            this.model = new App.Accounts.Account(User.get());
			cs.mediator.subscribe('ReturnRout', this.returnRoute, null, this);
			$('body').on('keydown', this.closeOnEscape.bind(this));
            $('body').on('keypress', this.updateOnEnter.bind(this));
        },
        
        render: function () {
            this.$el.append(this.template({
                name: this.model.get('name'),
                lastName: this.model.get('lastName'),
                login: this.model.get('login'),
                password: this.model.get('password')
            }));

            this.$('.preview').attr('src', this.model.get('avatar'));
            $('#main').css('position', 'fixed');
			
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

			this.cancel();
            User.set(this.model.toJSON());
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

        getUserAvatar: function (evt) {
            var that = this,
                reader,
                file;

            reader = new FileReader();
            file = evt.target.files;

            reader.onload = function () {
                that.model.set({avatar: reader.result});
                that.$('.preview').attr('src', reader.result);
                User.set('avatar', reader.result);
                that.model.set({'avatar': reader.result});
            };
            reader.readAsDataURL(file[0]);
        },
        
        show: function () {
            this.$el.removeClass('hidden');
        },
        
        generatePassword: function () {
            var generatedPassword = Generator.getPass();
            $('.password-input').val(generatedPassword);
        },
		
		returnRoute: function (route) {
            this.mainroute = '/' + route;
        },
		
		cancel: function () {
            this.$el.addClass('hidden');
			cs.mediator.publish('MenuClicked', this.mainroute);
			$('.menu-item').removeClass('active');
			$('#main').css('position', 'static');
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
        }
    });
})(App.UserSetting);
