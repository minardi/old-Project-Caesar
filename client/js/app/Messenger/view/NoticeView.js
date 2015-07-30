'use strict';

(function (This) {
    This.NoticeView = Backbone.View.extend({
        className: 'hidden notice',

        template: noticeTpl,

        set: function (message) {
            this.message = message;
        },

        events: {
            'click .close': 'hide'
        },

        render: function () {
            this.$el.html(this.template({message: this.message}))
                .removeClass('hidden')
                .animate({
                    top: '0px'
                }, {
                    duration: 500
                });

            this.timeout = setTimeout(this.hide.bind(this), 5000);

            return this;
        },

        hide: function () {
            this.$el.animate({
                top: '-52px'
            }, {
                duration: 500,
                complete: function () {
                    $(this).addClass('hidden');
                }
            });

            clearTimeout(this.timeout);
        }
    });
})(App.Messenger);