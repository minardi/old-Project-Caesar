(function (This)  {
    This.Controller = function () {
        var $ErrorPage = $('#main'),
            view;

        start();

        function start () {
            view = new This.ErrorPageView();

            $ErrorPage.html(view.render().el);
        }

        return this;
    }
})(App.ErrorPage);