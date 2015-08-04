(function (This) {
    This.Controller = function () {
        var account = new This.Account,
            accountView = new This.CreateAccountView({model: account}),
            loginView = new This.LoginAccountView();
            $accounts = $('#main');

        start();
        
        function start () {
            setUpMediator();
            $accounts.append(loginView.render().el);
            $accounts.append(accountView.render().el);
            accountView.hide();
        }

        function setUpMediator () {
            cs.mediator.subscribe('ShowLoginForm', showLoginView);
            cs.mediator.subscribe('ShowRegisterForm', showRegisterForm);
            cs.mediator.subscribe('CreateAccountViewClosed', viewClosed); 
        }

        function showLoginView () {
            hideAll();
            loginView.show();
        }

        function showRegisterForm () {
            hideAll();
            accountView.show();
        }

        function viewClosed () {
            view.remove();
        }
        
        function hideAll () {
            $accounts.children().addClass('hidden');
        }
        return this;
    }
})(App.Accounts);