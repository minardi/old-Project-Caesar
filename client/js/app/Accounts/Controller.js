(function (This) {
    This.Controller = function () {
        var accountView = new This.CreateAccountView(),
            collection = new This.AccountsCollection(),
            accounts = new This.AccountCollectionView({collection: collection}),
            $accounts = $('#main'),
            view;

        start();

        function start () {
            setUpMediator();
            $accounts.append(accounts.render().el);
            $accounts.append(accountView.render().el);
        }

        function setUpMediator () {
            cs.mediator.subscribe('CreateAccount', showAccountView);
            cs.mediator.subscribe('EditAccount', editView);
            cs.mediator.subscribe('AccountSaved', addToCollection);
            cs.mediator.subscribe('CreateAccountView', showCreateAccountView);
            cs.mediator.subscribe('CreateAccountViewClosed', viewClosed); 
        }

        function showAccountView () {
            hideAll();
            accounts.show();
        }

        function showCreateAccountView () {
            view && view.remove();
            view = new This.CreateAccountView();
            $accounts.append(view.render().el);
        }
        
        function editView (account) {
            view && view.remove();
            view = new This.CreateAccountView({model: account });
            $accounts.append(view.render().el);
        }

        function addToCollection (model) {
            collection.add(model);
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