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
            'blur .edit-type': 'save',
            'input .edit-type' : 'focus'
        },

        initialize: function () {
            Backbone.Validation.bind(this);
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
            this.focus();
        },

        focus: function () {
            this.$('.edit-type').focus();
        },

        save: function () {
            var value = this.$('.edit-type').val().trim().toLowerCase(),
                properValue = this.model.has('location')? firstToUpperCase(value): value,
                attributes = {
                    name: properValue
                };
            this.saveChangedAttr(attributes);
        },

        saveChangedAttr: function (attributes) {
            if (this.model.changedAttributes(attributes)) {
                if (!this.preValidate(attributes)) {
                    this.model.save(attributes);
                    this.$el.removeClass('editing');
                }
            } else { 
                this.model.previousAttributes();

                this.$el.removeClass('editing');
                this.render();
            }
        },

        updateOnEnter: function (e) {
            if (e.keyCode === ENTER) {
                this.save();
            }
        },

        revertOnEscape: function (e) {
            var attr = this.model.has('name')? 'name': 'countryName';
            if (e.which === ESC) {
                this.$el.removeClass('editing');
                this.$('.edit-type').val(this.model.get(attr));
            }
        },

        preValidate: function (attributes) {
            var validationResult,
                attrName;

            validationResult = this.validateName(attributes.name || attributes.countryName) || this.model.preValidate(attributes);

            if (validationResult) {
                for (attrName in validationResult) {
                    cs.mediator.publish(  
                        'Hint',
                        validationResult[attrName],
                        this.$('input')
                    );
                }
            }

            return validationResult;
        },

        validateName: function (value) {
            return validateNameField(value, this.model.collection.toJSON());
        }
    });
})(App.Settings);