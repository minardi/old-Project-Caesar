'use strict';
(function (This) {
    This.ItemView = Backbone.View.extend({
        tagName: 'li',
        className: 'list-group-item',
        tpl: templates.itemTpl,

        events: {
            'click .destroy': 'confirmDelete',
            'click .editSetings': 'edit',
            'dblclick': 'edit',
            'keypress .edit-type': 'updateOnEnter',
            'keydown .edit-type': 'revertOnEscape',
            'blur .edit-type': 'save'
        },

        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'change', this.render);
            this.defaultModelJSON = this.model.toJSON();
        },

        render: function () {
            this.$el.html(this.tpl(this.model.toJSON()));

            return this;
        },

        confirmDelete: function () {
            var message = 'Are you sure you want to delete "' + this.model.get('name') + '"?';
            cs.mediator.publish('Confirm', message, this.delete.bind(this));
        },

        delete: function () {
            if (this.model.get('countryName')) {
                cs.mediator.publish('DeleteCountry', this.model.id);
            }
            this.model.destroy();
            cs.mediator.publish('Notice', 'Item was succesfully deleted');
        },

        edit: function () {
            this.$el.addClass('editing');
            this.$('.edit-type').focus();
        },

        save: function () {
            var value = this.$('.edit-type').val().trim();

            if(value) {
                this.model.save({name: value});
            } else {
                this.confirmDelete();
            }
            this.$el.removeClass('editing');
        },

        updateOnEnter: function (e) {
            if (e.keyCode === ENTER) {
                this.save();
            }
        },

        revertOnEscape: function (e) {
            if (e.which === ESC) {
                this.$el.removeClass('editing');
                this.$('.edit-type').val(this.model.get('name'));
            }
        }
    });
})(App.Settings);