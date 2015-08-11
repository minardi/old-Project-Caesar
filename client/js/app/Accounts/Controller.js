(function (This) {
    This.Controller = function () {
        var collection = collections.accountsCollection,
            accounts = new This.AccountCollectionView({collection: collection}),
            $accounts = $('#main'),
            $city = $('.city'),
            view;

        start();

        function start () {
            setUpMediator();
            $accounts.append(accounts.render().el);
        }

        function setUpMediator () {
            cs.mediator.subscribe('ShowAccounts', showAccounts);
            cs.mediator.subscribe('EditAccount', editViewById);
            cs.mediator.subscribe('CreateAccount', createAccount);
            cs.mediator.subscribe('CreateAccountViewClosed', viewClosed); 
        }

        function showAccounts () {
            hideAll();
            view && view.remove();
            accounts.show();
        }

        function createAccount () {
            view && view.remove();
            view = new This.CreateEditAccountView();
            $accounts.append(view.render().el);
        }
        
        function editAccount (account) {
            view && view.remove();
            view = new This.CreateEditAccountView({model: account });
            $accounts.append(view.render().el);
        }

        function editViewById (id) {
           accounts.getModelById(id, editAccount);
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