'use strict';
(function (This) {
    This.CountryItemView = This.ItemView.extend({
        tagName: 'li',
        className: 'list-group-item',
        tpl: templates.itemTpl,

        events:{
            'click .destroy': 'confirmDelete',
            'click .editSetings': 'edit',             // in ItemView
            'dblclick': 'edit',                       // in ItemView
            'keypress .edit-type':	'updateOnEnter',  // in ItemView
            'keydown .edit-type': 'revertOnEscape',   // in ItemView
            'blur .edit-type': 'save'
        },

        initialize: function () {
            Backbone.Validation.bind(this);
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.tpl({
                name: this.model.get('countryName')
            }));

            return this;
        },

        confirmDelete: function () {
            var message = 'All cities will be deleted in "'  + this.model.get('countryName') + '". Delete in any case?';
            cs.mediator.publish('Confirm', message, this.delete.bind(this));   //this.delete in ItemView
        },

        save: function () {
            var value = firstToUpperCase(this.$('.edit-type').val().trim().toLowerCase()),
                attributes = {
                    countryName: value
                };
            this.saveChangedAttr(attributes);
        }
    });
})(App.Settings);