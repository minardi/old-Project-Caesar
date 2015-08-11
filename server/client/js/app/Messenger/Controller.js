'use strict';

(function (This) {
    This.Controller = function () {
        var noticeView = new This.NoticeView(),
            hintView = new This.HintView();

        cs.mediator.subscribe("Notice", showNotice);
        cs.mediator.subscribe("Hint", showHint);

        $('#messenger').html(noticeView.el);

        function showNotice (message) {
            noticeView.set(message);
            noticeView.render();
        }

        function showHint (message, $target) {
            hintView.set(message, $target);
            $target.parent().prepend(hintView.render().el);
        }

        return this;
    }
})(App.Messenger);