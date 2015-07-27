'use strict';
(function (This) {
    This.Controller = function () {
        var $menu = $('#menu');

        start();
        function start () {
            renderMenu();
        }

        function renderMenu (){
            var menuView = new This.MenuView();
            $menu.html(menuView.render().$el);
        }
    }
})(App.Menu);