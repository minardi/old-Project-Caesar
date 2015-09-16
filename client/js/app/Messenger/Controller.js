'use strict';

(function (This) {
    This.Controller = function () {
        var noticeView = new This.NoticeView(),
            hintView = new This.HintView(),
            $confirm = $('#confirm'),
            cascadeDelete,
            confirmView;

        cs.mediator.subscribe("Notice", showNotice);
        cs.mediator.subscribe("Hint", showHint);
        cs.mediator.subscribe("Confirm", showConfirm);
        cs.mediator.subscribe("ConfirmCascadeDelete", showConfirmDelete);

        $('#messenger').html(noticeView.el);

        function showNotice (message) {
            noticeView.set(message);
            noticeView.render();
        }

        function showHint (message, $target) {
            hintView.set(message, $target);
            $target.parent().prepend(hintView.render().el);
        }

        function showConfirm (message, callback) {
            confirmView = new This.ConfirmView();
            $confirm.html(confirmView.el);
            confirmView.set(message, callback);
            confirmView.render();
        }

        function showConfirmDelete(message, array, callback) {
            cascadeDelete = new This.CascadeDeleteView();
            $confirm.html(cascadeDelete.el);
            cascadeDelete.set(message, array, callback);
            cascadeDelete.render();
        }

        return this;
    }
})(App.Messenger);