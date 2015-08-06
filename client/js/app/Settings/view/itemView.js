'use strict';
(function (This) {
    This.ItemView = Backbone.View.extend({
        tagName: 'li',
        className: 'list-group-item',
        tpl: itemTpl,

        events:{
            'click .destroy': 'delete',
            'dblclick': 'edit',
            'keypress .edit-type':	'updateOnEnter',
            'keydown .edit-type': 'revertOnEscape',
            'blur .edit-type': 'save'
        },

        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));

            return this;
        },

        delete: function () {
            this.model.destroy();
        },

        edit: function () {
            this.$el.addClass('editing');
            this.$el.find('.edit-type').focus();
        },

        save: function () {
            var value = this.$('.edit-type').val().trim();

            if (value) {
                this.model.save({ name: value });
            } else {
                this.delete();
            }

            this.$el.removeClass('editing');
        },

        updateOnEnter: function (e) {
            var ENTER = 13;
            if (e.keyCode === ENTER) {
                this.save();
            }
        },
        revertOnEscape: function (e) {
            var ESC = 27;
            if (e.which === ESC) {
                this.$el.removeClass('editing');
                this.$('.edit-type').val(this.model.get('name'));
            }
        }
    });
})(App.Settings);