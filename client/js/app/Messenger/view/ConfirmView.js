'use strict';
(function (This) {
    This.ConfirmView = Backbone.View.extend({
        className: 'modal fade in hidden',

        template: templates.confirmTpl,

        events: {
            'click .delete': 'delete',
            'click .cancel': 'hide'
        },

        initialize: function () {
            $(document).on('keydown', this.checkKeyCommand.bind(this));
        },

        set: function (message, callback) {
            this.message = message;
            this.callback = callback;
        },

        render: function () {
            this.$el.html(this.template({message: this.message}))
                .removeClass('hidden');

            return this;
        },

        delete: function () {
            this.hide();
            this.callback();
        },

        hide: function () {
            this.$el.addClass('hidden');
        },

        checkKeyCommand: function (e) {
            if (e.keyCode === 27) {
                this.hide();
            }
        }
    });
})(App.Messenger);