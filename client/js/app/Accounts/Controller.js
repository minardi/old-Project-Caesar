(function (This) {
    This.Controller = function () {
        var account = new This.Account,
            accountView = new This.CreateAccountView(),
            $accounts = $('#main');

        start();
        
        function start () {
            setUpMediator();
            $accounts.append(accountView.render().el);
        }

        function setUpMediator () {
            cs.mediator.subscribe('CreateAccount', showAccountView);
        }

        function showAccountView () {
            hideAll();
            accountView.show();
        }
        
        function hideAll () {
            $accounts.children().addClass('hidden');
        }
        return this;
    }
})(App.Accounts);