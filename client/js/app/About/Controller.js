'use strict';

(function (This)  {
    This.Controller = function () {
        var $service = $('#main'),
            view;

        start();

        function start () {
            cs.mediator.subscribe('ShowAbout', showAbout);

            view = new This.GroupCollectionView();

            $service.append(view.render().el);
        }

        function showAbout () {
            hideAll();

            view.show();
        }

        function hideAll () {
            $service.children().addClass('hidden');
        }

        return this;
    }
})(App.About);