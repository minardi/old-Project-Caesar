(function (This)  {
    This.ErrorPageView = Backbone.View.extend({
        tpl: ErrorPageTpl,

        render: function () {
            this.$el.append(this.tpl());

            return this;
        }
    });
})(App.ErrorPage);