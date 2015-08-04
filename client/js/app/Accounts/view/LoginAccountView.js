(function (This) {
    This.LoginAccountView = Backbone.View.extend({
        template: loginAccountTpl,
        className: 'accounts',
        events: {
            'click .submit': 'submit',
            'click a': 'register'   

        },

        initialize: function () {
            this.$el.append(this.template());
            return this; 
        },

        render: function () {
            return this;
        },

        register: function () {
            cs.mediator.publish('ShowRegisterForm'); //publish to Controller
        },
        show: function () {
            this.$el.removeClass('hidden');
        },
    }); 
})(App.Accounts);
